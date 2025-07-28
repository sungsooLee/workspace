import { Volume2, VolumeX } from 'lucide-react';
import { VideoPlayerContainerProps } from '../types';
import { isMobile } from 'react-device-detect';
import {
  IcoExpand,
  IcoVideoPlay,
  IcoVideoStop,
  IcoReduce,
  IcoSubtitles,
  IcoSpeakerFill,
  IcoSettingsFill,
  IcoSpeakerOffFill,
  IcoPrevPlayFill,
} from '@learnway/icons';
import { useState } from 'react';
import SettingsPopover from './settings-popover';

import styles from './bottom-progress-bar.module.css';
import { useModal } from '../../modal/modal.hook';
import { VideoSettingModal } from './video-setting-modal';

const BottomProgressBar = (props: VideoPlayerContainerProps) => {
  const { alert: openAlert, openModal } = useModal();
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = async () => {
    if (isMobile) {
      openModal({
        width: 'm_bottom_sheet',
        content: <VideoSettingModal {...props} />,
      });
    } else {
      setShowSettings((prev) => !prev);
    }
  };

  // 🎬 시간 변환 함수
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className={`${styles.start} ${styles.progress_bar}`}>
      <div className={styles.progress_box} onClick={props.handleSeek}>
        <div className={styles.progress} style={{ width: `${props.played * 100}%` }} />
      </div>
      <div className={styles.option}>
        <div className={styles.left}>
          {/* <button>
            <IcoPrevPlayFill width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} />
          </button> */}
          <button onClick={props.togglePlay}>
            {props.playing ? (
              <IcoVideoStop width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} fill="#fff" />
            ) : (
              <IcoVideoPlay width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} fill="#fff" />
            )}
          </button>
          {/* 왼쪽: 볼륨 */}
          <div className={styles.volume}>
            <button onClick={props.toggleMute}>
              {props.muted || props.volume === 0 ? (
                <IcoSpeakerOffFill
                  width={isMobile ? 16 : 24}
                  height={isMobile ? 16 : 24}
                  fill="#fff"
                />
              ) : (
                <IcoSpeakerFill
                  width={isMobile ? 16 : 24}
                  height={isMobile ? 16 : 24}
                  fill="#fff"
                />
              )}
            </button>
            <input
              style={{
                background: `linear-gradient(to right, white 0%, white ${(props.muted ? 0 : props.volume) * 100}%, rgba(255,255,255,0.3) ${(props.muted ? 0 : props.volume) * 100}%, rgba(255,255,255,0.3) 100%)`,
              }}
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={props.muted ? 0 : props.volume}
              onChange={props.handleVolumeChange}
              className={styles.form_volume}
            />
          </div>
          <div className={styles.time}>
            <span>{formatTime(props.currentTime)}/</span>
            <span>{formatTime(props.duration)}</span>
          </div>
        </div>

        {/* 오른쪽: 설정, 전체화면 */}
        <div className={styles.right}>
          {props.videoSubtitles && (
            <IcoSubtitles
              className={styles.sub_title}
              width={isMobile ? 16 : 24}
              height={isMobile ? 16 : 24}
              fill={props.subtitlesVisible ? '#80aaff' : '#fff'}
              onClick={props.toggleSubtitles}
            />
          )}
          <div className="relative">
            <IcoSettingsFill
              className={styles.setting}
              width={isMobile ? 16 : 24}
              height={isMobile ? 16 : 24}
              fill={showSettings ? '#80aaff' : '#fff'}
              onClick={toggleSettings}
            />

            {showSettings && <SettingsPopover {...props} />}
          </div>
          <button onClick={props.toggleFullscreen}>
            {props.isFullscreen ? (
              <IcoReduce width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} stroke="#fff" />
            ) : (
              <IcoExpand width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} stroke="#fff" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomProgressBar;
