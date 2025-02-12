import { useRef } from 'react';
import { useModalStore } from '../stores/useModalStore';
import { Modal } from './modal';
import { ModalProvider } from './modal-context';
import { ModalContainerProps } from './type';

const ModalContainerComponent = ({ index, data }: ModalContainerProps) => {
  const close = useModalStore((state) => state.close);
  const { content, config } = data;

  const handleClose = (modalData?: any) => {
    close(index, modalData);
  };

  return (
    <ModalProvider value={{ closeModal: handleClose, isModal: true }}>
      <Modal {...config} onClose={handleClose}>
        {content}
      </Modal>
    </ModalProvider>
  );
};

ModalContainerComponent.displayName = 'ModalContainer';

export const ModalContainer = ModalContainerComponent;
