import { useModalStore } from '../stores/useModalStore';
import { ModalConfig } from './type';
import { Modal } from './modal';

const ModalWrapperComponent = () => {
  const { modals, close } = useModalStore();

  const handleClose = (modalData?: any) => {
    close(modalData);
  };

  return (
    <>
      {modals?.map((config: ModalConfig, index: number) => (
        <Modal key={index} {...config} onClose={handleClose} />
      ))}
    </>
  );
};
export const ModalWrapper = ModalWrapperComponent;
