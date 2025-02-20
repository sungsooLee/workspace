import { useModalStore } from '../stores/useModalStore';
import { Modal } from './modal';
import { ModalProvider } from './modal-context';
import { ModalContainerProps } from './type';

const ModalContainerComponent = ({ index, config }: ModalContainerProps) => {
  const close = useModalStore((state) => state.close);

  const handleClose = (modalData?: any) => {
    close(index, modalData);
  };

  return (
    <ModalProvider value={{ closeModal: handleClose, isModal: true }}>
      <Modal {...config} onClose={handleClose} />
    </ModalProvider>
  );
};

ModalContainerComponent.displayName = 'ModalContainer';

export const ModalContainer = ModalContainerComponent;
