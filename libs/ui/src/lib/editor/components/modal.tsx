import { FC } from 'react';
import { ReactNode, useEffect, useRef } from 'react';
import { isDOMNode } from 'lexical';
import { createPortal } from 'react-dom';
interface ModalProps {
  children: ReactNode; // 모달 내부에 렌더링할 React 노드
  closeOnClickOutside: boolean; // 외부 클릭 이벤트
  onClose: () => void; // 클로즈 콜백 이벤트
  title: string; // 모달의 제목
}

/**
 * 모달 컴포넌트
 * @param onClose
 * @param children
 * @param title
 * @param closeOnClickOutside
 * @constructor
 */
const Modal: FC<ModalProps> = ({ onClose, children, title, closeOnClickOutside }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  let modalOverlayElement: HTMLElement | null = null;

  /**
   * handler 함수는 키보드 이벤트를 감지하고, ESC 키를 입력하면 onClose 호출.
   * useEffect를 통해 keydown 이벤트 리스너를 등록하고 컴포넌트가 언마운트되면 리스너를 제거.
   * @param event
   */
  const handler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  /**
   * clickOutsideHandler는 클릭 이벤트의 target이 모달 외부인지 확인.
   * modalRef.current.contains(target)로 클릭된 요소가 모달 내부인지 판별.
   * 외부 클릭 시 closeOnClickOutside가 true일 경우 onClose 호출.
   * @param event
   */
  const clickOutsideHandler = (event: MouseEvent) => {
    const target = event.target;
    if (
      modalRef.current !== null &&
      isDOMNode(target) &&
      !modalRef.current.contains(target) &&
      closeOnClickOutside
    ) {
      onClose();
    }
  };

  /**
   * 현재 modalRef 엘리먼트를 기준으로 가장 가까운 부모 엘리먼트를 찾음.
   * .np-editor-container 클래스를 가진 요소를 찾거나 기본적으로 document.body 반환.
   */
  const getClosestContainer = (): HTMLElement => {
    if (modalRef.current) {
      // 현재 modalRef를 기준으로 가장 가까운 'nlp--editor-container' 클래스 엘리먼트 찾기
      const closestContainer = modalRef.current.closest('.nlp--editor-container') as HTMLElement;
      return closestContainer || document.body; // 없으면 기본적으로 body 반환
    }
    return document.body; // modalRef가 없을 때 기본 값
  };
  const parentElement = getClosestContainer();

  /**
   * 모달이 렌더링되면 modalRef.current.focus()로 포커스를 모달로 이동
   */
  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    /**
     * 모달이 렌더링될 때 keydown과 클릭 이벤트를 리스너로 등록.
     * 모달이 언마운트되면 등록된 모든 이벤트 리스너를 해제해 메모리 누수를 방지.
     */
    const modelElement = modalRef.current;
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener('click', clickOutsideHandler);
      }
    }

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);

  return createPortal(
    <div
      className="nlp--editor-modal-overlay z-100 fixed inset-0 flex flex-col items-center justify-center bg-[rgba(40,40,40,0.6)]"
      role="dialog">
      <div className="nlp--editor-modal" tabIndex={-1} ref={modalRef}>
        <h2 className="nlp--editor-modal-title">{title}</h2>
        <button
          className="nlp--editor-modal-close-button"
          aria-label="Close modal"
          type="button"
          onClick={onClose}>
          X
        </button>
        <div className="nlp--editor-modal-content">{children}</div>
      </div>
    </div>,
    parentElement,
  );
};

export default Modal;
