import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'; // Lexical 에디터 컨텍스트를 가져오는 훅
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils'; // 노드를 래핑하거나 여러 이벤트 등록을 병합하기 위한 유틸리티 함수
import {
  $createParagraphNode,
  $createRangeSelection,
  $getSelection,
  $insertNodes,
  $isNodeSelection,
  $isRootOrShadowRoot,
  $setSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  createCommand,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  getDOMSelection,
  isHTMLElement,
  LexicalCommand,
  LexicalEditor,
} from 'lexical'; // Lexical 에디터 관련 주요 함수 및 명령
import { useEffect } from 'react';

import { $createImageNode, $isImageNode, ImageNode, ImagePayload } from '../nodes/image.node'; // 이미지 노드 생성 및 확인 유틸리티

/**
 * InsertImagePayload 타입 정의
 *
 * Lexical 에디터에서 이미지를 삽입할 때 필요한 데이터 구조를 정의
 */
export type InsertImagePayload = Readonly<ImagePayload>;

/**
 * INSERT_IMAGE_COMMAND
 *
 * 이미지를 삽입하기 위한 Lexical 명령어를 생성
 */
export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> =
  createCommand('INSERT_IMAGE_COMMAND');

/**
 * ImagesPlugin 컴포넌트
 *
 * Lexical 에디터에 이미지 삽입, 드래그 앤 드롭, 및 관련 기능을 추가
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {boolean} [props.captionsEnabled] - 캡션 기능 활성화 여부
 * @returns {JSX.Element | null} Lexical 에디터와 통합된 이미지 관련 기능
 */
export default function ImagesPlugin({
  captionsEnabled,
}: {
  captionsEnabled?: boolean;
}): JSX.Element | null {
  const [editor] = useLexicalComposerContext(); // Lexical 에디터 인스턴스 가져오기

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error('ImagesPlugin: ImageNode not registered on editor'); // ImageNode가 등록되지 않은 경우 에러 발생
    }

    // Lexical 에디터 명령 등록
    return mergeRegister(
      // 이미지 삽입 명령 등록
      editor.registerCommand<InsertImagePayload>(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          const imageNode = $createImageNode(payload); // 새로운 이미지 노드 생성
          $insertNodes([imageNode]); // 에디터에 노드 삽입
          if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
            $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd(); // 루트 노드에 추가 시 Paragraph로 래핑
          }
          return true;
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      // 드래그 시작 명령 등록
      editor.registerCommand<DragEvent>(
        DRAGSTART_COMMAND,
        (event) => {
          return $onDragStart(event);
        },
        COMMAND_PRIORITY_HIGH,
      ),
      // 드래그 중 명령 등록
      editor.registerCommand<DragEvent>(
        DRAGOVER_COMMAND,
        (event) => {
          return $onDragover(event);
        },
        COMMAND_PRIORITY_LOW,
      ),
      // 드롭 명령 등록
      editor.registerCommand<DragEvent>(
        DROP_COMMAND,
        (event) => {
          return $onDrop(event, editor);
        },
        COMMAND_PRIORITY_HIGH,
      ),
    );
  }, [captionsEnabled, editor]); // captionsEnabled와 editor 변경 시 동작

  return null;
}

// 투명 이미지를 드래그 중 보이도록 설정
const TRANSPARENT_IMAGE =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const img = document.createElement('img');
img.src = TRANSPARENT_IMAGE;

/**
 * 드래그 시작 이벤트 핸들러
 *
 * @param {DragEvent} event - 드래그 시작 이벤트
 * @returns {boolean} 드래그 시작 성공 여부
 */
function $onDragStart(event: DragEvent): boolean {
  const node = $getImageNodeInSelection(); // 현재 선택된 이미지 노드 가져오기
  if (!node) {
    return false;
  }
  const dataTransfer = event.dataTransfer;
  if (!dataTransfer) {
    return false;
  }
  // 드래그 데이터를 설정
  dataTransfer.setData('text/plain', '_');
  dataTransfer.setDragImage(img, 0, 0); // 투명 이미지 사용
  dataTransfer.setData(
    'application/x-lexical-drag',
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        maxWidth: node.__maxWidth,
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width,
      },
      type: 'image',
    }),
  );
  return true;
}

/**
 * 드래그 중 이벤트 핸들러
 *
 * @param {DragEvent} event - 드래그 중 이벤트
 * @returns {boolean} 드래그 중 동작 여부
 */
function $onDragover(event: DragEvent): boolean {
  const node = $getImageNodeInSelection();
  if (!node) {
    return false;
  }
  if (!canDropImage(event)) {
    event.preventDefault(); // 드롭 불가능한 경우 기본 동작 차단
  }
  return true;
}

/**
 * 드롭 이벤트 핸들러
 *
 * @param {DragEvent} event - 드롭 이벤트
 * @param {LexicalEditor} editor - Lexical 에디터 인스턴스
 * @returns {boolean} 드롭 성공 여부
 */
function $onDrop(event: DragEvent, editor: LexicalEditor): boolean {
  const node = $getImageNodeInSelection();
  if (!node) {
    return false;
  }
  const data = getDragImageData(event);
  if (!data) {
    return false;
  }
  event.preventDefault(); // 기본 드롭 동작 차단
  if (canDropImage(event)) {
    const range = getDragSelection(event); // 드롭 위치 계산
    node.remove(); // 기존 노드 삭제
    const rangeSelection = $createRangeSelection();
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range);
    }
    $setSelection(rangeSelection); // 선택 영역 업데이트
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, data); // 이미지 삽입 명령 실행
  }
  return true;
}

/**
 * 선택된 이미지 노드 가져오기
 *
 * @returns {ImageNode | null} 선택된 이미지 노드 또는 null
 */
function $getImageNodeInSelection(): ImageNode | null {
  const selection = $getSelection();
  if (!$isNodeSelection(selection)) {
    return null;
  }
  const nodes = selection.getNodes();
  const node = nodes[0];
  return $isImageNode(node) ? node : null;
}

/**
 * 드래그 이미지 데이터 가져오기
 *
 * @param {DragEvent} event - 드래그 이벤트
 * @returns {InsertImagePayload | null} 드래그 데이터 또는 null
 */
function getDragImageData(event: DragEvent): null | InsertImagePayload {
  const dragData = event.dataTransfer?.getData('application/x-lexical-drag');
  if (!dragData) {
    return null;
  }
  const { type, data } = JSON.parse(dragData);
  if (type !== 'image') {
    return null;
  }
  return data;
}

/**
 * 이미지 드롭 가능 여부 확인
 *
 * @param {DragEvent} event - 드래그 이벤트
 * @returns {boolean} 드롭 가능 여부
 */
function canDropImage(event: DragEvent): boolean {
  const target = event.target;
  return !!(
    (
      isHTMLElement(target) &&
      !target.closest('code, span.editor-image') && // 금지된 영역 확인
      isHTMLElement(target.parentElement) &&
      target.parentElement.closest('div.ContentEditable__root')
    ) // 허용된 영역 확인
  );
}

/**
 * 드래그 선택 영역 가져오기
 *
 * @param {DragEvent} event - 드래그 이벤트
 * @returns {Range | null | undefined} 선택된 범위
 */
function getDragSelection(event: DragEvent): Range | null | undefined {
  let range;
  const target = event.target as null | Element | Document;
  const targetWindow =
    target == null
      ? null
      : target.nodeType === 9
      ? (target as Document).defaultView
      : (target as Element).ownerDocument.defaultView;
  const domSelection = getDOMSelection(targetWindow);
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY);
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
    range = domSelection.getRangeAt(0);
  } else {
    throw Error(`Cannot get the selection when dragging`);
  }
  return range;
}

// 글로벌 DragEvent에 rangeOffset 및 rangeParent 속성 추가
declare global {
  interface DragEvent {
    rangeOffset?: number;
    rangeParent?: Node;
  }
}
