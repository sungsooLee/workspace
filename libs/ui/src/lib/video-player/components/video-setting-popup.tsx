import { memo } from 'react';
import { t } from 'i18next';
import { IcoArrowForward } from '@learnway/icons';

import styles from './video-setting-popup.module.css';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle } from '../../modal/modal-container';
import { Button } from '../../button/button';

const VideoSettingPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{t('설정')}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.video_setting}`}>
          <ul>
            <li>
              <Button>
                <strong>{t('재생속도')}</strong>
                <span>
                  1x
                  <IcoArrowForward width={16} height={16} stroke="#131416" />
                </span>
              </Button>
            </li>
            <li>
              <Button>
                <strong>{t('소스')}</strong>
                <span>
                  Auto
                  <IcoArrowForward width={16} height={16} stroke="#131416" />
                </span>
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

export const VideoSettingPopup = memo(VideoSettingPopupComponent);
