import { memo } from 'react';
import { ModalBody, ModalContainer, ModalTitle, ModalFooter, Button } from '@learnway/ui';
import { IcoCheck } from '@learnway/icons';

import styles from './video-setting-popup.module.css';

const VideoSubsettingPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'자막'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.video_subsetting}`}>
          <ul>
            <li>
              <Button className={styles.active}>
                <strong>Korean</strong>
                <IcoCheck width={24} height={24} stroke="#0056ff" />
              </Button>
            </li>
            <li>
              <Button>
                <strong>Arabic</strong>
              </Button>
            </li>
          </ul>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant={'gray'} size={'lg'}>
          <span>취소</span>
        </Button>
        <Button variant={'primary'} size={'lg'}>
          <span>확인</span>
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const VideoSubsettingPopup = memo(VideoSubsettingPopupComponent);
