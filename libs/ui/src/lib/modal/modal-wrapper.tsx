import { useModalStore } from '../stores/useModalStore';
import { ModalConfig } from './type';
import { Modal } from './modal';
import { cn } from '@learnway/shared';
import styles from './modal-wrapper.module.css';

const ModalWrapperComponent = () => {
  const { modals, close } = useModalStore();

  const handleClose = (modalData?: any) => {
    close(modalData);
  };

  return (
    <div className={cn(styles.start, !!modals?.length && styles.dim)}>
      {modals?.map((config: ModalConfig) => (
        <Modal {...config} key={config.id} onClose={handleClose} />
      ))}
    </div>
  );
};
export const ModalWrapper = ModalWrapperComponent;
