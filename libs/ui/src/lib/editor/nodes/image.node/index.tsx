import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedEditor,
  SerializedLexicalNode,
  Spread,
} from 'lexical';

import { $applyNodeReplacement, createEditor, DecoratorNode } from 'lexical';
import * as React from 'react';
import { Suspense } from 'react';

// ImageComponent를 동적으로 가져옵니다. 렌더링 최적화를 위해 lazy loading 적용
const ImageComponent = React.lazy(() => import('./image'));

/**
 * ImagePayload 인터페이스 정의
 *
 * ImageNode 생성 시 필요한 데이터를 나타냅니다.
 */
export interface ImagePayload {
  altText: string; // 이미지의 대체 텍스트 (접근성 향상)
  caption?: LexicalEditor; // 이미지 캡션을 관리하는 LexicalEditor 인스턴스
  height?: number; // 이미지 높이 (픽셀 단위)
  maxWidth?: number; // 이미지 최대 너비 (픽셀 단위)
  width?: number; // 이미지 너비 (픽셀 단위)
  key?: NodeKey; // Lexical 에디터에서 노드 식별을 위한 고유 키
  showCaption?: boolean; // 캡션 표시 여부
  src: string; // 이미지 소스 URL 또는 Base64 데이터
  captionsEnabled?: boolean; // 캡션 편집 기능 활성화 여부
}

/**
 * Google Docs의 체크박스 이미지인지 확인
 *
 * @param {HTMLImageElement} img - 검사할 이미지 요소
 * @returns {boolean} 체크박스 이미지 여부
 */
function isGoogleDocCheckboxImg(img: HTMLImageElement): boolean {
  return (
    img.parentElement != null &&
    img.parentElement.tagName === 'LI' &&
    img.previousSibling === null &&
    img.getAttribute('aria-roledescription') === 'checkbox'
  );
}

/**
 * DOM 요소를 ImageNode로 변환
 *
 * @param {Node} domNode - 변환 대상 DOM 노드
 * @returns {null | DOMConversionOutput} 변환 결과
 */
function $convertImageElement(domNode: Node): null | DOMConversionOutput {
  const img = domNode as HTMLImageElement;
  // 로컬 파일이나 Google Docs 체크박스 이미지는 변환하지 않음
  if (img.src.startsWith('file:///') || isGoogleDocCheckboxImg(img)) {
    return null;
  }
  const { alt: altText, src, width, height } = img;
  const node = $createImageNode({ altText, height, src, width });
  return { node };
}

/**
 * SerializedImageNode 타입 정의
 *
 * ImageNode를 JSON으로 직렬화한 데이터 구조를 정의
 */
export type SerializedImageNode = Spread<
  {
    altText: string; // 대체 텍스트
    caption: SerializedEditor; // 직렬화된 캡션 데이터
    height?: number; // 이미지 높이
    maxWidth: number; // 이미지 최대 너비
    showCaption: boolean; // 캡션 표시 여부
    src: string; // 이미지 소스 URL
    width?: number; // 이미지 너비
  },
  SerializedLexicalNode
>;

/**
 * ImageNode 클래스 정의
 *
 * Lexical 에디터에서 이미지를 관리하는 노드
 */
export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string; // 이미지 URL
  __altText: string; // 이미지 대체 텍스트
  __width: 'inherit' | number; // 이미지 너비
  __height: 'inherit' | number; // 이미지 높이
  __maxWidth: number; // 이미지 최대 너비
  __showCaption: boolean; // 캡션 표시 여부
  __caption: LexicalEditor; // 캡션 관리 LexicalEditor
  __captionsEnabled: boolean; // 캡션 활성화 여부

  /**
   * 노드 타입 반환
   *
   * @returns {string} 'image'
   */
  static getType(): string {
    return 'image';
  }

  /**
   * ImageNode 복제
   *
   * @param {ImageNode} node - 복제할 노드
   * @returns {ImageNode} 복제된 노드
   */
  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__maxWidth,
      node.__width,
      node.__height,
      node.__showCaption,
      node.__caption,
      node.__captionsEnabled,
      node.__key,
    );
  }

  /**
   * JSON 데이터를 기반으로 ImageNode를 생성
   *
   * @param {SerializedImageNode} serializedNode - 직렬화된 노드 데이터
   * @returns {ImageNode} 생성된 노드
   */
  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, height, width, maxWidth, caption, src, showCaption } = serializedNode;
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      showCaption,
      src,
      width,
    });
    const nestedEditor = node.__caption;
    const editorState = nestedEditor.parseEditorState(caption.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

  /**
   * ImageNode를 JSON 형식으로 직렬화
   *
   * @returns {SerializedImageNode} 직렬화된 데이터
   */
  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      height: this.__height === 'inherit' ? 0 : this.__height,
      maxWidth: this.__maxWidth,
      showCaption: this.__showCaption,
      src: this.getSrc(),
      type: 'image',
      version: 1,
      width: this.__width === 'inherit' ? 0 : this.__width,
    };
  }

  /**
   * DOM 요소로 변환
   *
   * @returns {DOMExportOutput} 변환된 DOM 요소
   */
  exportDOM(): DOMExportOutput {
    const element = document.createElement('img');
    element.setAttribute('src', this.__src);
    element.setAttribute('alt', this.__altText);
    element.setAttribute('width', this.__width.toString());
    element.setAttribute('height', this.__height.toString());
    return { element };
  }

  /**
   * DOM 요소를 ImageNode로 변환하기 위한 맵 반환
   *
   * @returns {DOMConversionMap | null} DOM 변환 매핑
   */
  static importDOM(): DOMConversionMap | null {
    return {
      img: (node: Node) => ({
        conversion: $convertImageElement,
        priority: 0,
      }),
    };
  }

  /**
   * ImageNode 생성자
   *
   * @param {string} src - 이미지 URL
   * @param {string} altText - 대체 텍스트
   * @param {number} maxWidth - 최대 너비
   * @param {'inherit' | number} [width] - 이미지 너비
   * @param {'inherit' | number} [height] - 이미지 높이
   * @param {boolean} [showCaption] - 캡션 표시 여부
   * @param {LexicalEditor} [caption] - 캡션 LexicalEditor
   * @param {boolean} [captionsEnabled] - 캡션 활성화 여부
   * @param {NodeKey} [key] - 노드 키
   */
  constructor(
    src: string,
    altText: string,
    maxWidth: number,
    width?: 'inherit' | number,
    height?: 'inherit' | number,
    showCaption?: boolean,
    caption?: LexicalEditor,
    captionsEnabled?: boolean,
    key?: NodeKey,
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__maxWidth = maxWidth;
    this.__width = width || 'inherit';
    this.__height = height || 'inherit';
    this.__showCaption = showCaption || false;
    this.__caption =
      caption ||
      createEditor({
        nodes: [],
      });
    this.__captionsEnabled = captionsEnabled || captionsEnabled === undefined;
  }

  /**
   * 이미지 너비와 높이를 설정
   *
   * @param {'inherit' | number} width - 이미지 너비
   * @param {'inherit' | number} height - 이미지 높이
   */
  setWidthAndHeight(width: 'inherit' | number, height: 'inherit' | number): void {
    const writable = this.getWritable();
    writable.__width = width;
    writable.__height = height;
  }

  /**
   * 캡션 표시 여부를 설정
   *
   * @param {boolean} showCaption - 캡션 표시 여부
   */
  setShowCaption(showCaption: boolean): void {
    const writable = this.getWritable();
    writable.__showCaption = showCaption;
  }

  /**
   * DOM 요소를 생성
   *
   * @param {EditorConfig} config - Lexical 에디터 설정
   * @returns {HTMLElement} 생성된 DOM 요소
   */
  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span');
    const theme = config.theme;
    const className = theme.image;
    if (className !== undefined) {
      span.className = className;
    }
    return span;
  }

  /**
   * DOM 업데이트 방지
   *
   * @returns {false} 항상 false 반환
   */
  updateDOM(): false {
    return false;
  }

  /**
   * 이미지 URL 반환
   *
   * @returns {string} 이미지 URL
   */
  getSrc(): string {
    return this.__src;
  }

  /**
   * 이미지 대체 텍스트 반환
   *
   * @returns {string} 대체 텍스트
   */
  getAltText(): string {
    return this.__altText;
  }

  /**
   * JSX 요소로 노드를 장식
   *
   * @returns {JSX.Element} 렌더링될 JSX 요소
   */
  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <ImageComponent
          src={this.__src}
          altText={this.__altText}
          width={this.__width}
          height={this.__height}
          maxWidth={this.__maxWidth}
          nodeKey={this.getKey()}
          showCaption={this.__showCaption}
          caption={this.__caption}
          captionsEnabled={this.__captionsEnabled}
          resizable={true}
        />
      </Suspense>
    );
  }
}

/**
 * ImageNode를 생성
 *
 * @param {ImagePayload} payload - ImageNode 생성 데이터
 * @returns {ImageNode} 생성된 ImageNode
 */
export function $createImageNode({
  altText,
  height,
  maxWidth = 500,
  captionsEnabled,
  src,
  width,
  showCaption,
  caption,
  key,
}: ImagePayload): ImageNode {
  return $applyNodeReplacement(
    new ImageNode(
      src,
      altText,
      maxWidth,
      width,
      height,
      showCaption,
      caption,
      captionsEnabled,
      key,
    ),
  );
}

/**
 * 노드가 ImageNode인지 확인
 *
 * @param {LexicalNode | null | undefined} node - 검사할 노드
 * @returns {boolean} ImageNode 여부
 */
export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
