import { memo } from 'react';
import { ModalBody, ModalContainer, ModalTitle, ModalFooter, Button } from '@learnway/ui';

import { IcoRefresh02, IcoPrevNext } from '@learnway/icons';

import styles from './next-learning-popup.module.css';

const NextLearningPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'다음 강의'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.learning}`}>
          레슨 2 이북 (다음 레슨 제목이 옵니다)
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant={'gray'} size={'lg'} className={styles.btn_refresh}>
          <IcoRefresh02 width={24} height={24} stroke="#6f798b" fill="#fff" />
          <span>다시보기</span>
        </Button>
        <Button variant={'primary'} size={'lg'} className={styles.btn_learning}>
          <span>다음 강의</span>
          <IcoPrevNext width={24} height={24} stroke="#fff" />
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const NextLearningPopup = memo(NextLearningPopupComponent);
