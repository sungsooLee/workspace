import { Volume2, VolumeX } from 'lucide-react';
import { PlayerContainerProps } from '../types';
import {
  IcoExpand,
  IcoPlayerPause,
  IcoPlayerPlay,
  IcoPlayerSetting,
  IcoReduce,
  IcoSubtitles,
} from '@learnway/icons';
import { useState } from 'react';
import SettingsPopover from './settings-popover';

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
  PlayerContainerProps,
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
    <div className="absolute bottom-0 left-0 w-full px-4 pb-6 text-white">
      <div className="h-2 w-full cursor-pointer rounded bg-white/30" onClick={handleSeek}>
        <div className="h-full rounded bg-[#00AFD5]" style={{ width: `${played * 100}%` }} />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex flex-row items-center gap-6">
          <button onClick={togglePlay}>
            {playing ? (
              <IcoPlayerPause className="h-6 w-6 text-white" />
            ) : (
              <IcoPlayerPlay className="h-6 w-6 text-white" />
            )}
          </button>
          {/* 왼쪽: 볼륨 */}
          <div className="flex items-center gap-2">
            <button onClick={toggleMute}>
              {muted || volume === 0 ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6 fill-white" />
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
              className="h-1 w-24 cursor-pointer appearance-none rounded-full bg-transparent [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
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
