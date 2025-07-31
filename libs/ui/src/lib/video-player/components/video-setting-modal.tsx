import { memo, useState } from 'react';
import { t } from 'i18next';
import { IcoArrowForward, IcoCheck } from '@learnway/icons';

import styles from './video-setting-popup.module.css';
import { Button } from '../../button/button';
import { ModalBody, ModalContainer, ModalFooter, ModalTitle } from '../../modal/modal-container';
import { VideoPlayerContainerProps } from '../types';
import { useModal } from '../../modal/modal.hook';
import { getHeightValueEncodedVideo, VideoQualities, VideoSpeed } from '../hooks/video-player.hook';

const MENU = {
  ROOT: 'root',
  SPEED: 'speed',
  SOURCE: 'source',
  QUALITY: 'quality',
  SUBTITLE: 'subtitle',
} as const;

type MenuType = (typeof MENU)[keyof typeof MENU];

const VideoSettingModalComponent = (props: VideoPlayerContainerProps) => {
  const { alert: openAlert, closeModal } = useModal();

  const [activeMenu, setActiveMenu] = useState<MenuType>(MENU.ROOT);

  switch (activeMenu) {
    case MENU.SPEED:
      return (
        <ModalContainer>
          <ModalTitle>{t('재생속도')}</ModalTitle>
          <ModalBody>
            <div className={`${styles.start} ${styles.video_setting}`}>
              <ul>
                {VideoSpeed.map((v) => (
                  <MobileVidoeMenuItem
                    key={v.label}
                    label={v.label}
                    active={props.playbackRate === v.value}
                    onClick={() => {
                      props.changePlaybackRate(v.value);
                      closeModal(true);
                    }}
                  />
                ))}
              </ul>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant={'primary'} size={'lg'} onClick={() => setActiveMenu(MENU.ROOT)}>
              <span>{t('확인')}</span>
            </Button>
          </ModalFooter>
        </ModalContainer>
      );
    case MENU.QUALITY: {
      const listQuerites: any[] = [{ ...VideoQualities.auto }];
      if (props.encodedVideos) {
        if (getHeightValueEncodedVideo(props.encodedVideos, VideoQualities.high.height))
          listQuerites.push(VideoQualities.high);
        if (getHeightValueEncodedVideo(props.encodedVideos, VideoQualities.middle.height))
          listQuerites.push(VideoQualities.middle);
        if (getHeightValueEncodedVideo(props.encodedVideos, VideoQualities.low.height))
          listQuerites.push(VideoQualities.low);
      }
      return (
        <ModalContainer>
          <ModalTitle>{t('품질')}</ModalTitle>
          <ModalBody>
            <div className={`${styles.start} ${styles.video_setting}`}>
              <ul>
                {listQuerites.map((v) => (
                  <MobileVidoeMenuItem
                    key={v.label}
                    label={v.label}
                    active={props.videoQuality.label === v.label}
                    onClick={() => {
                      props.changeQuality(v);
                      closeModal(true);
                    }}
                  />
                ))}
              </ul>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant={'primary'} size={'lg'} onClick={() => setActiveMenu(MENU.ROOT)}>
              <span>{t('확인')}</span>
            </Button>
          </ModalFooter>
        </ModalContainer>
      );
    }
    case MENU.SUBTITLE:
      return (
        <ModalContainer>
          <ModalTitle>{t('자막')}</ModalTitle>
          <ModalBody>
            <div className={`${styles.start} ${styles.video_setting}`}>
              <ul>
                {props.videoSubtitles?.map((v) => (
                  <MobileVidoeMenuItem
                    key={v.label}
                    label={v.label}
                    active={props.selectedSubtitle.srcLang === v.srcLang}
                    onClick={() => {
                      props.changeSubtitle(v);
                      closeModal(true);
                    }}
                  />
                ))}
              </ul>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant={'primary'} size={'lg'} onClick={() => setActiveMenu(MENU.ROOT)}>
              <span>{t('확인')}</span>
            </Button>
          </ModalFooter>
        </ModalContainer>
      );
    default:
      return (
        <ModalContainer>
          <ModalTitle>{t('설정')}</ModalTitle>
          <ModalBody>
            <div className={`${styles.start} ${styles.video_setting}`}>
              <ul>
                <li>
                  <Button onClick={() => setActiveMenu(MENU.SPEED)}>
                    <strong>{t('재생속도')}</strong>
                    <span>
                      {VideoSpeed.find((item) => item.value === props.playbackRate)?.label}
                      <IcoArrowForward width={16} height={16} stroke="#131416" />
                    </span>
                  </Button>
                </li>
                {props.encodedVideos && (
                  <li>
                    <Button onClick={() => setActiveMenu(MENU.QUALITY)}>
                      <strong>{t('품질')}</strong>
                      <span>
                        {props.videoQuality.label}
                        <IcoArrowForward width={16} height={16} stroke="#131416" />
                      </span>
                    </Button>
                  </li>
                )}
                {props.videoSubtitles && (
                  <li>
                    <Button onClick={() => setActiveMenu(MENU.SUBTITLE)}>
                      <strong>{t('자막')}</strong>
                      <span>
                        {props.selectedSubtitle.label}
                        <IcoArrowForward width={16} height={16} stroke="#131416" />
                      </span>
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant={'primary'}
              size={'lg'}
              onClick={() => {
                closeModal();
              }}
            >
              <span>{t('확인')}</span>
            </Button>
          </ModalFooter>
        </ModalContainer>
      );
  }
};

export const VideoSettingModal = VideoSettingModalComponent;

const MobileVidoeMenuItem = ({
  label,
  active,
  onClick,
}: {
  label: any;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <li>
      <Button className={active ? styles.active : ''} onClick={onClick}>
        <strong>{label}</strong>
        {active && <IcoCheck width={24} height={24} stroke="#0056ff" />}
      </Button>
    </li>
  );
};
