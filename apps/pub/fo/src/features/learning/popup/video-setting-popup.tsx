import { memo } from 'react';
import { ModalBody, ModalContainer, ModalTitle, ModalFooter, Button } from '@learnway/ui';
import { IcoArrowForward, IcoCheck } from '@learnway/icons';

import styles from './video-setting-popup.module.css';

const VideoSettingPopupComponent = () => {
  return (
    <ModalContainer>
      <ModalTitle>{'설정'}</ModalTitle>
      <ModalBody>
        <div className={`${styles.start} ${styles.video_setting}`}>
          <ul>
            <li>
              <Button>
                <strong>재생속도</strong>
                <span>
                  1x
                  <IcoArrowForward width={16} height={16} stroke="#131416" />
                </span>
              </Button>
            </li>
            <li>
              <Button>
                <strong>소스</strong>
                <span>
                  Auto
                  <IcoArrowForward width={16} height={16} stroke="#131416" />
                </span>
              </Button>
            </li>
            <li>
              <Button>
                <strong>Korean</strong>
                <IcoCheck width={24} height={24} stroke="#0056ff" />
              </Button>
            </li>
            <li>
              <Button>
                <strong>Korean</strong>
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

export const VideoSettingPopup = memo(VideoSettingPopupComponent);
