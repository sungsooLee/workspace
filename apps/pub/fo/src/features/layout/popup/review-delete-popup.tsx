import { memo } from 'react';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle, Button } from '@learnway/ui';

import styles from './review-delete-popup.module.css';

const ReviewDeletePopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'알림'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.review_delete_wrap}`}>
          <p>후기를 삭제하시겠습니까?</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button label={'취소'} variant="gray" size="lg"></Button>
        <Button label={'확인'} variant={'primary'} size={'lg'}></Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const ReviewDeletePopup = memo(ReviewDeletePopupComponent);
