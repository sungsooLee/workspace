import { FC } from 'react';
import { ReactNode, useEffect, useRef } from 'react';
import { isDOMNode } from 'lexical';
import { createPortal } from 'react-dom';
interface ModalProps {
  children: ReactNode;
  closeOnClickOutside: boolean; // 외부 클릭 이벤트
  onClose: () => void; // 클로즈 콜백 이벤트
  title: string;
}

const Modal: FC<ModalProps> = ({ onClose, children, title, closeOnClickOutside }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
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

  // 부모 엘리먼트를 찾는 함수
  const getClosestContainer = (): HTMLElement => {
    if (modalRef.current) {
      // 현재 modalRef를 기준으로 가장 가까운 'nlp--editor-container' 클래스 엘리먼트 찾기
      const closestContainer = modalRef.current.closest('.nlp--editor-container') as HTMLElement;
      return closestContainer || document.body; // 없으면 기본적으로 body 반환
    }
    return document.body; // modalRef가 없을 때 기본 값
  };
  const parentElement = getClosestContainer();
  return createPortal(
    <div
      className="nlp--editor-modal-overlay fixed inset-0 flex flex-col items-center justify-center bg-[rgba(40,40,40,0.6)] z-100"
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
