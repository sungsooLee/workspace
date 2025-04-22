import { memo } from 'react';
import { ModalBody, ModalContainer, ModalFooter, Button } from '@learnway/ui';
import { IcoProgress } from '@learnway/icons';
import { isMobile } from 'react-device-detect';

import styles from './accepting-popup.module.css';

const AcceptingPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalBody>
        <div className={`${styles.start} ${styles.accepting_wrap}`}>
          {/* progress 미작업 (아이콘 임시) */}
          <IcoProgress width={isMobile ? 32 : 54} height={isMobile ? 32 : 54} />
          <strong>수강 신청 접수중입니다</strong>
          <p>잠시만 기다려주세요.</p>
        </div>
      </ModalBody>
      {/* <ModalFooter>
        <Button label={'기다리기'} variant={'gray'} size={'lg'}></Button>
        <Button label={'나의 학습'} variant={'primary'} size={'lg'} />
      </ModalFooter> */}
    </ModalContainer>
  );
};

export const AcceptingPopup = memo(AcceptingPopupComponent);
