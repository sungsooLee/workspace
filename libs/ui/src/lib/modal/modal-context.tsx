import { createContext, useContext } from 'react';

interface ModalContextValue {
  closeModal: (data?: any) => void; // 모달 닫기 위한 함수
  isModal: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ModalContext.Provider;

export const useModalContext = () => {
  const context = useContext(ModalContext);

  return {
    closeModal: (data?: any) => {
      if (context) {
        context.closeModal(data);
      }
    },
    isModal: !!context,
  };
};
