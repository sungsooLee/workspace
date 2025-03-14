import { memo } from 'react';
import styles from './agreement-popup.module.css';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, Button, useModal } from '@learnway/ui';

const ContactPopupCompoment = () => {
  const { close: closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'문의하기'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.agreement_popup}`}></div>
      </ModalBody>

      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const ContactPopup = memo(ContactPopupCompoment);
