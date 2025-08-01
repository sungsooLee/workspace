import { memo } from 'react';
import styles from './agreement-detail-popup.module.css';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, useModal } from '@learnway/ui/modal';
import { Button } from '@learnway/ui/button';

const AgreementDetailPopupCompoment = () => {
  const { closeModal } = useModal();
  return (
    <ModalContainer>
      <ModalTitle>{'약관상세 팝업'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.agreement_detail_popup}`}>
          <div className={styles.details}>약관 내용</div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button label={'확인'} variant={'primary'} size={'lg'} onClick={() => closeModal()} />
      </ModalFooter>
    </ModalContainer>
  );
};

export const AgreementDetailPopup = memo(AgreementDetailPopupCompoment);
