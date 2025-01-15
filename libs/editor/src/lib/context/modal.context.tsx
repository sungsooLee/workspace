import React, { createContext, ReactNode, useContext, useState } from 'react';

// ModalContext의 타입 정의
interface ModalContextProps {
  openModal: (title: string, content: ReactNode) => void;
  closeModal: () => void;
}

// 초기값 (모달 닫힘 상태와 기본값)
const Context = createContext<ModalContextProps | undefined>(undefined);

// ModalProvider 생성
export const ModalContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState<{ title?: string; contents?: ReactNode; open: boolean }>({
    open: false,
  });

  // 모달 열기 - 타이틀과 콘텐츠를 함께 설정
  const handleOpenModal = (title: string, modalContent: ReactNode) => {
    setModal({ title, contents: modalContent, open: true });
  };

  // 모달 닫기 - 상태 초기화
  const handleCloseModal = () => {
    setModal({ open: false });
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    //handleCloseModal(); // 오버레이 클릭 시 모달을 닫음
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파를 중단하여 오버레이 클릭 이벤트를 막음
  };

  return (
    <Context.Provider
      value={{
        openModal: handleOpenModal,
        closeModal: handleCloseModal,
      }}>
      {children}
      {modal.open && (
        <div
          className="nlp--editor-modal-overlay absolute inset-0 z-[100] flex items-center justify-center bg-[rgba(40,40,40,0.6)]"
          onClick={handleOverlayClick}>
          <div
            className="nlp--editor-modal relative z-[101] flex min-w-[300px] flex-col rounded bg-white p-4 shadow-lg"
            onClick={handleModalClick}>
            <div className="nlp--editor-modal-header flex items-center justify-between">
              {modal.title && (
                <h2 className="nlp--editor-modal-title text-lg font-bold">{modal.title}</h2>
              )}
              <button
                className="nlp--editor-modal-close-btn text-gray-500 hover:text-black"
                onClick={handleCloseModal}>
                X
              </button>
            </div>
            {modal.contents && (
              <div className={'nlp--editor-modal-body mt-2'}>{modal.contents}</div>
            )}
          </div>
        </div>
      )}
    </Context.Provider>
  );
};

// 훅을 통해 컨텍스트를 쉽게 사용할 수 있도록 설정
export const useModal = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
