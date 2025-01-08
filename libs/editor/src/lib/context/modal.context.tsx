import React, { createContext, ReactNode, useContext, useState } from 'react';

// ModalContext의 타입 정의
interface ModalContextProps {
  openModal: (title: string, content: ReactNode) => void;
}

// 초기값 (모달 닫힘 상태와 기본값)
const Context = createContext<ModalContextProps | undefined>(undefined);

// 훅을 통해 컨텍스트를 쉽게 사용할 수 있도록 설정
export const useModal = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

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
    handleCloseModal(); // 오버레이 클릭 시 모달을 닫음
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 이벤트 전파를 중단하여 오버레이 클릭 이벤트를 막음
  };

  return (
    <Context.Provider
      value={{
        openModal: handleOpenModal,
      }}>
      {children}
      {modal.open && (
        <div
          className="nlp--editor-modal-overlay absolute inset-0 flex items-center justify-center bg-[rgba(40,40,40,0.6)] z-[100]"
          onClick={handleOverlayClick}>
          <div
            className="nlp--editor-modal bg-white p-4 rounded shadow-lg relative z-[101] "
            onClick={handleModalClick}>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={handleCloseModal}>
              X
            </button>
            {modal.title && <h2 className="text-lg font-bold mb-4">{modal.title}</h2>}
            {modal.contents && modal.contents}
          </div>
        </div>
      )}
    </Context.Provider>
  );
};
