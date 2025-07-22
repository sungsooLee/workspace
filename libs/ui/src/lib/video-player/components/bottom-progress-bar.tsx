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
} from '@learnway/icons';
import { useState } from 'react';
import SettingsPopover from './settings-popover';

import styles from './bottom-progress-bar.module.css';

const BottomProgressBar = ({
  isFullscreen,
  playing,
  subtitlesVisible,
  currentTime,
  muted,
  duration,
  played,
  volume,
  toggleMute,
  handleVolumeChange,
  toggleSubtitles,
  toggleFullscreen,
  togglePlay,
  changePlaybackRate,
  handleSeek,
}: Pick<
  VideoPlayerContainerProps,
  | 'isFullscreen'
  | 'currentTime'
  | 'subtitlesVisible'
  | 'toggleMute'
  | 'muted'
  | 'duration'
  | 'played'
  | 'volume'
  | 'handleVolumeChange'
  | 'toggleSubtitles'
  | 'toggleFullscreen'
  | 'togglePlay'
  | 'playing'
  | 'handleSeek'
  | 'changePlaybackRate'
>) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
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
      <div className={styles.progress_box} onClick={handleSeek}>
        <div className={styles.progress} style={{ width: `${played * 100}%` }} />
      </div>
      <div className={styles.option}>
        <div className={styles.left}>
          <button onClick={togglePlay}>
            {playing ? (
              <IcoVideoStop width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} fill="#fff" />
            ) : (
              <IcoVideoPlay width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} fill="#fff" />
            )}
          </button>
          {/* 왼쪽: 볼륨 */}
          <div className={styles.volume}>
            <button onClick={toggleMute}>
              {muted || volume === 0 ? (
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
                background: `linear-gradient(to right, white 0%, white ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`,
              }}
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className={styles.form_volume}
            />
          </div>
          {isMobile || (
            <div className={styles.time}>
              <span>{formatTime(currentTime)}/</span>
              <span>{formatTime(duration)}</span>
            </div>
          )}
        </div>

        {/* 오른쪽: 설정, 전체화면 */}
        <div className={styles.right}>
          <IcoSubtitles
            className={styles.sub_title}
            width={isMobile ? 16 : 24}
            height={isMobile ? 16 : 24}
            fill={subtitlesVisible ? '#80aaff' : '#fff'}
            onClick={() => (isMobile ? '' : toggleSubtitles)}
          />
          <div className="relative">
            <IcoSettingsFill
              className={styles.setting}
              width={isMobile ? 16 : 24}
              height={isMobile ? 16 : 24}
              fill={showSettings ? '#80aaff' : '#fff'}
              onClick={toggleSettings}
            />

            {showSettings && <SettingsPopover changePlaybackRate={changePlaybackRate} />}
          </div>
          <button onClick={toggleFullscreen}>
            {isFullscreen ? (
              <IcoReduce width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} />
            ) : (
              <IcoExpand width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomProgressBar;
