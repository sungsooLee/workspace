import { memo } from 'react';
import { ModalBody, ModalContainer, ModalFooter, Button, Spinner } from '@learnway/ui';
import { isMobile } from 'react-device-detect';

import styles from './accepting-popup.module.css';

const AcceptingPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalBody>
        <div className={`${styles.start} ${styles.accepting_wrap}`}>
          <Spinner isLoading={true} showBackdrop={true} iconType={'dots'} />
          <strong>수강 신청 접수중입니다</strong>
          <p>잠시만 기다려주세요.</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className={styles.btn_box}>
          <Button label={'기다리기'} variant={'gray'} size={'xl'}></Button>
          <Button label={'나의 학습'} variant={'primary'} size={'xl'} />
        </div>
      </ModalFooter>
    </ModalContainer>
  );
};

export const AcceptingPopup = memo(AcceptingPopupComponent);
