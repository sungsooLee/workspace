import styles from './copy.module.css';
import { useTranslation } from 'react-i18next';
import { Button, ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui';

const CopyModalComponent = () => {
  const { t } = useTranslation();
  const { close: closeModal } = useModal();

  const handleClose = (confirmed: boolean) => {
    closeModal(confirmed);
  };

  const defaultFooter = (
    <Button variant="primary" size="lg" onClick={() => handleClose(true)}>
      확인
    </Button>
  );

  return (
    <ModalContainer className={styles.copy}>
      <ModalTitle>
        <div>타이틀</div>
      </ModalTitle>
      <ModalBody>
        <div>컨텐츠</div>
      </ModalBody>
      <ModalFooter>
        <div>{defaultFooter}</div>
      </ModalFooter>
    </ModalContainer>
  );
};

export const CopyModal = CopyModalComponent;
