import { memo } from 'react';
import { t } from 'i18next';
import { IcoCheck } from '@learnway/icons';

import styles from './video-subsetting-popup.module.css';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle } from '../../modal/modal-container';
import { Button } from '../../button/button';

const VideoSubsettingPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{t('자막')}</ModalTitle>
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
          <span>{t('취소')}</span>
        </Button>
        <Button variant={'primary'} size={'lg'}>
          <span>{t('확인')}</span>
        </Button>
      </ModalFooter>
    </ModalContainer>
  );
};

export const VideoSubsettingPopup = memo(VideoSubsettingPopupComponent);
