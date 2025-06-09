import {
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Settings,
  Subtitles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { PlayerContainerProps } from '../types';

const BottomProgressBar = ({
  isFullscreen,
  playing,
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
  handleSeek,
}: Pick<
  PlayerContainerProps,
  | 'isFullscreen'
  | 'currentTime'
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
>) => {
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
    <div className="absolute bottom-0 left-0 w-full px-4 pb-4 text-white">
      <div className="h-2 w-full cursor-pointer rounded bg-white/30" onClick={handleSeek}>
        <div className="h-full rounded bg-[#1a2223]" style={{ width: `${played * 100}%` }} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-row items-center gap-6">
          <button onClick={togglePlay}>{playing ? <Pause size={24} /> : <Play size={24} />}</button>
          {/* 왼쪽: 볼륨 */}
          <div className="flex items-center gap-2">
            <button onClick={toggleMute}>
              {muted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
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
          <Subtitles size={24} className="cursor-pointer" onClick={toggleSubtitles} />
          <Settings size={24} className="cursor-pointer" />
          <button onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomProgressBar;
