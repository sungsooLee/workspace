import React, { useCallback, useRef, useState } from 'react';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
} from 'react-icons/fa';
import { throttle } from 'lodash';

type VideoControlsProps = {
  playing: boolean;
  muted: boolean;
  volume: number;
  played: number;
  duration: number;
  onPlayPause: () => void;
  onVolumeToggle: () => void;
  onVolumeChange: (value: number) => void;
  onFullscreenToggle: () => void;
  isFullscreen: boolean;
  loaded: number;
  onSeekMouseDown: () => void;
  onSeekChange: (value: number) => void;
  onSeekMouseUp: (value: number) => void;
  // onSeekMouse
};

const VideoControls: React.FC<VideoControlsProps> = ({
  playing,
  muted,
  volume,
  played,
  duration,
  onPlayPause,
  onVolumeToggle,
  onVolumeChange,
  onFullscreenToggle,
  onSeekMouseDown,
  onSeekChange,
  onSeekMouseUp,
  isFullscreen,
  loaded,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hoverTime, setHoverTime] = useState<string | null>(null);
  const [hoverTimePosition, setHoverTimePosition] = useState({ left: 0 });

  const seekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeekChange(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onVolumeChange(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    onSeekMouseUp(parseFloat(e.currentTarget.value));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLInputElement>) => {
      if (e.currentTarget) {
        const boundingRect = e.currentTarget.getBoundingClientRect();
        const hoverPosition =
          (e.clientX - boundingRect.left) / boundingRect.width;
        const hoverTimeSeconds = hoverPosition * duration;
        setHoverTime(formatTime(hoverTimeSeconds));
        setHoverTimePosition({ left: e.clientX - boundingRect.left });
      }
    }, 10),
    [duration]
  );

  const handleMouseLeave = () => {
    setHoverTime(null);
  };

  return (
    <div className='absolute bottom-0 left-0 right-0 flex items-center justify-between space-x-5 bg-black bg-opacity-75 p-2 text-xs'>
      <button onClick={onPlayPause} className='mr-2 text-white'>
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <div
        className='relative mr-2 flex items-center'
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <button onClick={onVolumeToggle} className='text-white'>
          {muted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <div
          className={`absolute left-full top-1/2 ml-2 -translate-y-1/2 transform bg-opacity-100 p-1 transition-all duration-1000 ease-in-out ${
            showVolumeSlider ? 'w-24 opacity-100' : 'w-0 opacity-0'
          }`}
          style={{ transformOrigin: 'left', zIndex: 10 }}
        >
          <input
            type='range'
            min={0}
            max={1}
            step='0.01'
            value={volume}
            onChange={handleVolumeChange}
            className='h-1 w-16 cursor-pointer'
          />
        </div>
      </div>
      <div className='flex flex-1 items-center'>
        <span
          className={`mr-2 text-white transition-all duration-1000 ease-in-out ${showVolumeSlider ? 'ml-24' : 'ml-0'}`}
        >
          {formatTime(played * duration)}
        </span>
        <div className='relative flex-1'>
          <div className='relative w-full'>
            {/* <div className='absolute block h-[100%] bg-black bg-opacity-50'>
              <div className='-top-3.5 text-white'>
                {hoverTime && (
                  <div
                    className='absolute top-0 -translate-x-1/2 -translate-y-6 rounded bg-gray-800 px-1 py-0.5 text-white'
                    style={{
                      left: hoverTimePosition.left,
                    }}
                  >
                    {hoverTime}
                  </div>
                )}
              </div>
            </div> */}
            {/* <div
              className='bg-lightblue absolute left-0 top-0 h-full'
              style={{ width: `${loaded * 2}%`, zIndex: 10 }} // 로드된 진행 상태 반영
            >
              <span className='text-white'>{Math.ceil(loaded)}%</span>
            </div> */}
            <input
              type='range'
              min={0}
              max={1}
              step='0.01'
              value={played}
              onChange={seekChange}
              onMouseDown={onSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className='relative h-1 w-full cursor-pointer'
            />
          </div>
        </div>
        <span className='ml-2 text-white'>{formatTime(duration)}</span>
      </div>
      <button onClick={onFullscreenToggle} className='ml-2 text-white'>
        {isFullscreen ? <FaCompress /> : <FaExpand />}
      </button>
    </div>
  );
};

export default VideoControls;
