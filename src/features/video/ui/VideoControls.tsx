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
// import VolumeSlider from './volume-slider';

type VideoControlsProps = {
  playing: boolean;
  muted: boolean;
  volume: number;
  played: number;
  duration: number;
  playbackRate: number;
  onPlayPause: () => void;
  onVolumeToggle: () => void;
  onVolumeChange: (value: number) => void;
  onFullscreenToggle: () => void;
  isFullscreen: boolean;
  loaded: number;
  onSeekMouseDown: () => void;
  onSeekChange: (value: number) => void;
  onSeekMouseUp: (value: number) => void;
  onPlaybackRateChange: (rate: number) => void;
  subtitles: any;
  selectedSubtitle: string;
  onSubtitleChange: (src: string) => void;
};

const VideoControls: React.FC<VideoControlsProps> = ({
  playing,
  muted,
  volume,
  played,
  duration,
  playbackRate,
  onPlayPause,
  onVolumeToggle,
  onVolumeChange,
  onFullscreenToggle,
  onSeekMouseDown,
  onSeekChange,
  onSeekMouseUp,
  onPlaybackRateChange,
  isFullscreen,
  loaded,
  subtitles,
  selectedSubtitle,
  onSubtitleChange,
}) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [hoverTime, setHoverTime] = useState<string | null>(null);
  const [hoverTimePosition, setHoverTimePosition] = useState({ left: 0 });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSubtitleDropdown, setShowSubtitleDropdown] = useState(false);
  const playbackRates = [0.5, 1, 1.5, 2];
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
    }, 100),
    [duration, formatTime]
  );

  const dropdownRef = useRef<HTMLDivElement>(null);
  const subtitleDropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setShowDropdown(false);
    }
  };

  const handleSubtitleSelect = (src: string) => {
    onSubtitleChange(src);
  };

  const handleSubtitleDropdownToggle = () => {
    setShowSubtitleDropdown((prev) => !prev);
  };

  const handleSubtitleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!subtitleDropdownRef.current?.contains(e.relatedTarget as Node)) {
      setShowSubtitleDropdown(false);
    }
  };

  return (
    <>
      <div className='absolute bottom-0 left-0 right-0 flex items-center justify-between space-x-5 bg-black bg-opacity-75 p-2 text-xs'>
        <button
          onClick={onPlayPause}
          className='mr-2 text-white'
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? <FaPause /> : <FaPlay />}
        </button>
        <div
          className='relative mr-2 flex items-center'
          // onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            // onClick={onVolumeToggle}
            className='text-white'
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <div
            className={`absolute left-full top-1/2 ml-2 -translate-y-1/2 transform bg-opacity-100 p-1 transition-all duration-300 ease-in-out ${
              showVolumeSlider ? 'w-24 opacity-100' : 'w-0 opacity-0'
            }`}
            style={{ transformOrigin: 'left', zIndex: 10 }}
          >
            <div className='volume-slider'>
              <input
                type='range'
                min={0}
                max={1}
                step='0.01'
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                // onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className='h-1 w-16 cursor-pointer'
                aria-label='Volume'
              />
            </div>
          </div>
        </div>
        {/* <VolumeSlider playerRef={ref} /> */}
        <div className='flex flex-1 items-center'>
          <span
            className={`mr-2 text-white transition-all duration-300 ease-in-out ${showVolumeSlider ? 'ml-24' : 'ml-0'}`}
          >
            {formatTime(played * duration)}
          </span>
          <div className='relative flex-1'>
            <div className='video-progress-container'>
              <div
                className='progress-bar played'
                style={{ width: `${played * 100}%` }}
              />
              <div
                className='progress-bar loaded'
                style={{ width: `${loaded * 100}%` }}
              />
              <input
                // disabled={true} // disabled 특정 권한 혹은 상태일때 disabled 속성 하면 됨.
                type='range'
                min={0}
                max={1}
                step='0.001'
                value={played}
                onChange={(e) => onSeekChange(parseFloat(e.target.value))}
                onMouseDown={onSeekMouseDown}
                onMouseUp={(e) =>
                  onSeekMouseUp(parseFloat(e.currentTarget.value))
                }
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoverTime(null)}
                className='relative h-1 w-full cursor-pointer'
                aria-label='Seek'
              />
              {hoverTime && (
                <div
                  className='absolute top-0 -translate-x-1/2 -translate-y-6 rounded bg-gray-800 px-1 py-0.5 text-white'
                  style={{ left: hoverTimePosition.left }}
                >
                  {hoverTime}
                </div>
              )}
            </div>
          </div>
          <span className='ml-2 text-white'>{formatTime(duration)}</span>
        </div>
        {/* <div className='flex items-center space-x-2'>
          {playbackRates.map((rate) => (
            <button key={rate} onClick={() => onPlaybackRateChange(rate)}>
              {rate}x
            </button>
          ))}
        </div> */}
        <div className='relative' ref={dropdownRef} onBlur={handleDropdownBlur}>
          <button
            onClick={handleDropdownToggle}
            className='rounded border border-white px-2 text-white'
            aria-haspopup='listbox'
          >
            {playbackRate}x
          </button>
          {showDropdown && (
            <ul
              className={`absolute ${isFullscreen ? 'bottom-full mb-1' : 'top-full mt-1'} right-0 mt-1 rounded border border-gray-700 bg-black text-white shadow-lg`}
              role='listbox'
              tabIndex={-1}
            >
              {playbackRates.map((rate) => (
                <li
                  key={rate}
                  onClick={() => onPlaybackRateChange(rate)}
                  className={`cursor-pointer px-4 py-2 ${
                    playbackRate === rate ? 'bg-gray-700 font-bold' : ''
                  }`}
                  role='option'
                  aria-selected={playbackRate === rate}
                >
                  {rate}x
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className='relative'
          ref={subtitleDropdownRef}
          onBlur={handleSubtitleDropdownBlur}
        >
          <button
            onClick={handleSubtitleDropdownToggle}
            className='rounded border border-white px-2 text-white'
            aria-haspopup='listbox'
          >
            Subtitles
          </button>
          {showSubtitleDropdown && (
            <ul
              className={`absolute ${isFullscreen ? 'bottom-full mb-1' : 'top-full mt-1'} right-0 mt-1 rounded border border-gray-700 bg-black text-white shadow-lg`}
              role='listbox'
              tabIndex={-1}
            >
              {subtitles.map((subtitle: any) => (
                <li
                  key={subtitle.label}
                  onClick={() => handleSubtitleSelect(subtitle.label)}
                  className={`cursor-pointer px-4 py-2 ${
                    selectedSubtitle === subtitle.label
                      ? 'bg-gray-700 font-bold'
                      : ''
                  }`}
                  role='option'
                  aria-selected={selectedSubtitle === subtitle.label}
                >
                  {subtitle.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={onFullscreenToggle}
          className='ml-2 text-white'
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>
      <div></div>
    </>
  );
};

export default React.memo(VideoControls);
