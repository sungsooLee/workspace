import { useModalStore } from '../stores/useModalStore';
import BaseModal from './modal';
import { ModalProvider } from './modal-context';
import { ModalContainerProps } from './type';

const ModalContainer = ({ index, data }: ModalContainerProps) => {
  const close = useModalStore((state) => state.close);
  const { content, config } = data;

  const handleClose = (modalData?: any) => {
    close(index, modalData);
  };

  return (
    <ModalProvider value={{ closeModal: handleClose }}>
      <BaseModal {...config} onClose={handleClose}>
        {content}
      </BaseModal>
    </ModalProvider>
  );
};

export default ModalContainer;
