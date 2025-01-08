// FloatingModalContext 정의
import React, {
  createContext,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { $getSelection, getDOMSelection, $isRangeSelection } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

// 플로팅 모달 위치 조정을 위한 간격 상수 설정
const VERTICAL_GAP = 10; // 상하 간격
const HORIZONTAL_OFFSET = 5; // 좌우 간격

// FloatingModalContext의 타입 정의
interface FloatingModalContextValue {
  scrollTarget?: RefObject<HTMLDivElement>; // DOM 스크롤을 대상 요소로 참조
  openModal: (contents: ReactNode) => void; // 모달 열기 함수
  closeModal: () => void; // 모달 닫기 함수
  isOpen: boolean; // 모달 오픈 상태
}

// Context 생성
const Context = createContext<FloatingModalContextValue | undefined>(undefined); // 초기값은 undefined로 시작

/**
 * 플로팅 모달 Context Provider
 * @param children - 해당 컨텍스트 하위 컴포넌트
 * @param scrollTarget - 플로팅 모달이 의존하는 스크롤 대상
 */
export const FloatingModalContext: React.FC<{
  children: ReactNode; // 컨텍스트 하위 자식 요소
  scrollTarget?: RefObject<HTMLDivElement>; // 스크롤 대상 전달
}> = ({ children, scrollTarget }) => {
  const floatingModalRef = useRef<HTMLDivElement | null>(null); // 플로팅 모달 DOM 참조
  const [editor] = useLexicalComposerContext(); // Lexical의 편집기 인스턴스 가져오기
  const [modal, setModal] = useState<{ open: boolean; contents?: ReactNode }>({ open: false });

  /**
   * 링크 에디터를 위한 플로팅 요소의 위치 설정
   * @param targetRect - 기준이 되는 DOMRect (타겟 요소의 위치 및 크기)
   * @param floatingElem - 플로팅 모달 DOM 요소
   * @param anchorElem - 기준 앵커 요소
   * @param verticalGap - 위아래 간격 (기본값: VERTICAL_GAP)
   * @param horizontalOffset - 좌우 간격 (기본값: HORIZONTAL_OFFSET)
   */
  const setFloatingElemPositionForLinkEditor = (
    targetRect: DOMRect | null,
    floatingElem: HTMLElement,
    anchorElem: HTMLElement,
    verticalGap: number = VERTICAL_GAP,
    horizontalOffset: number = HORIZONTAL_OFFSET,
  ) => {
    const scrollerElem = anchorElem.parentElement; // 앵커 요소의 상위(스크롤러) 요소

    if (targetRect === null || !scrollerElem) {
      // 대상 Rect가 없거나 스크롤러 요소가 없는 경우 플로팅 모달 제거
      floatingElem.style.opacity = '0';
      floatingElem.style.transform = 'translate(-10000px, -10000px)';
      return;
    }

    // 플로팅 요소, 기준 요소, 스크롤러 요소의 위치 및 크기 가져오기
    const floatingElemRect = floatingElem.getBoundingClientRect();
    const anchorElementRect = anchorElem.getBoundingClientRect();
    const editorScrollerRect = scrollerElem.getBoundingClientRect();

    // 같은 부모 노드의 .nlp--editor-tool-bar 높이 확인
    const parent = floatingElem.parentNode as HTMLElement;
    const toolbar = parent?.querySelector<HTMLElement>('.nlp--editor-tool-bar');
    if (toolbar) {
      verticalGap = verticalGap - toolbar.getBoundingClientRect().height; // toolbar의 높이를 간격에 반영
    }

    let top = targetRect.top - verticalGap; // 플로팅 요소의 초기 Y 위치
    let left = targetRect.left - horizontalOffset; // 플로팅 요소의 초기 X 위치

    // 플로팅 모달이 스크롤러 상단 범위를 넘어가면 아래쪽으로 이동 (사라짐 방지)
    if (top < editorScrollerRect.top) {
      top += floatingElemRect.height + targetRect.height + verticalGap * 2;
    }

    // 플로팅 모달이 스크롤러 우측 범위를 넘어가면 좌측으로 조정
    if (left + floatingElemRect.width > editorScrollerRect.right) {
      left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset;
    }

    // 기준 앵커 요소와의 상대적 위치 조정
    top -= anchorElementRect.top;
    left -= anchorElementRect.left;

    // 새 위치와 CSS 스타일 적용
    floatingElem.style.opacity = '1'; // 모달 표시
    floatingElem.style.transform = `translate(${left}px, ${top}px)`; // 위치 설정
  };

  /**
   * 플로팅 모달 열기
   */
  const handleOpenModal = (contents: ReactNode) => {
    editor.read(() => {
      if (scrollTarget && scrollTarget.current) {
        const selection = $getSelection(); // 현재 선택 상태 가져오기
        const floatingModalElem = floatingModalRef.current; // 모달 요소 DOM 가져오기
        const nativeSelection = getDOMSelection(editor._window); // DOM Selection 가져오기

        if (floatingModalElem === null) {
          return; // 모달 요소가 없으면 아무 작업도 하지 않음
        }
        const rootElement = editor.getRootElement(); // 루트 DOM 요소 가져오기

        // 선택(selection)이 유효하고 루트 요소 안에 포함되는 경우
        if (
          selection !== null &&
          nativeSelection !== null &&
          rootElement !== null &&
          rootElement.contains(nativeSelection.anchorNode)
        ) {
          const domRect: DOMRect | undefined =
            nativeSelection.focusNode?.parentElement?.getBoundingClientRect(); // 선택한 노드의 위치 찾기
          if (domRect) {
            domRect.y += 40; // 위치 조정
            // 링크 에디터 위치 설정
            setFloatingElemPositionForLinkEditor(domRect, floatingModalElem, scrollTarget.current);
          }
        }
      }
    });
    setModal({ open: true, contents });
  };

  /**
   * 플로팅 모달 닫기
   */
  const handleCloseModal = () => {
    setModal({ open: false });
  };

  return (
    <Context.Provider
      value={{
        isOpen: modal.open,
        scrollTarget,
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
      }}>
      {children}
      <div
        className={`nlp--editor-floating-modal flex absolute top-0 left-0 z-10 max-w-[400px] w-full opacity-0 bg-white shadow-[0_-2px_2px_rgba(0,0,0,0.1),4px_4px_6px_rgba(0,0,0,0.2),-4px_4px_6px_rgba(0,0,0,0.2)] rounded-b-lg transition-opacity duration-500 will-change-transform ${
          modal.open ? 'flex' : 'hidden'
        }`}
        ref={floatingModalRef}>
        {modal.contents && modal.contents}
      </div>
    </Context.Provider>
  );
};

// Context를 가져오는 Hook
export const useFloatingModal = (): FloatingModalContextValue => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useFloatingModalContext must be used within a FloatingModalProvider');
  }
  return context;
};
