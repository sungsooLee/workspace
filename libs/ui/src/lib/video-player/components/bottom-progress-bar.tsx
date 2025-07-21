import { Volume2, VolumeX } from 'lucide-react';
import { VideoPlayerContainerProps } from '../types';
import {
  IcoExpand,
  IcoVideoPlay,
  IcoVideoStop,
  IcoPlayerSetting,
  IcoReduce,
  IcoSubtitles,
  IcoNextPlayFill,
  IcoPrevPlayFill,
  IcoSpeakerFill,
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
          <button>
            <IcoPrevPlayFill width={24} height={24} />
          </button>
          <button onClick={togglePlay}>
            {playing ? (
              <IcoVideoStop width={24} height={24} fill="#fff" />
            ) : (
              <IcoVideoPlay width={24} height={24} fill="#fff" />
            )}
          </button>
          <button>
            <IcoNextPlayFill width={24} height={24} />
          </button>
          {/* 왼쪽: 볼륨 */}
          <div className={styles.volume}>
            <button onClick={toggleMute}>
              {muted || volume === 0 ? (
                <VolumeX width={24} height={24} stroke="#fff" />
              ) : (
                <IcoSpeakerFill width={24} height={24} fill="#fff" />
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
              // className="[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
              className={styles.form_volume}
            />
          </div>
          <div className="mb-1 flex justify-between text-sm">
            <span>{formatTime(currentTime)}/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* 오른쪽: 설정, 전체화면 */}
        <div className="flex gap-4">
          <IcoSubtitles
            className={`h-6 w-6 cursor-pointer ${subtitlesVisible ? 'fill-[#00AFD5]' : 'fill-white'}`}
            onClick={toggleSubtitles}
          />
          <div className="relative">
            <IcoPlayerSetting
              className={`h-6 w-6 cursor-pointer ${showSettings ? 'fill-[#00AFD5]' : 'fill-white'}`}
              onClick={toggleSettings}
            />

            {showSettings && <SettingsPopover changePlaybackRate={changePlaybackRate} />}
          </div>
          <button onClick={toggleFullscreen}>
            {isFullscreen ? (
              <IcoReduce className="h-6 w-6 cursor-pointer" />
            ) : (
              <IcoExpand className="h-6 w-6 cursor-pointer" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomProgressBar;
