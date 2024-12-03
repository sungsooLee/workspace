import { createContext, useContext } from 'react';

interface ModalContextValue {
  closeModal: (data?: any) => void; // 모달 닫기 위한 함수
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ModalContext.Provider;

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('컨텍스트가 없습니다.');
  }

  return context;
};
