import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import {
  FaBackward,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeDown,
  FaVolumeUp,
} from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import ControlBar from './controlBar/ControlBar';
import { VideoState } from '../model/model';
import { useVideoAPI } from '../hooks/useVideoAPI';

interface VideoPlayerContainerProps {
  initialState: VideoState;
  refetchFunc: () => void;
}

const VideoPlayerContainer: React.FC<VideoPlayerContainerProps> = ({
  initialState,
  refetchFunc,
}) => {
  const [isHover, setIsHover] = useState(true);
  const {
    playerRef,
    state,
    handlePlayPause,
    handleVolumeChange,
    handleProgress,
    handleDuration,
    toggleMute,
    handleSeekChange,
    seekMouseDown,
    seekMouseUp,
    handleSubtitleChange,
    handleBuffer,
    handleBufferEnd,
    handlePlaybackChange,
    handleRewind,
    handleForward,
    isLoading,
    handleReady,
    startTime,
    elapsedTime,
  } = useVideoPlayer(initialState);
  const cumulativePlaybackTimeRef = useRef(0);
  const startTimeRef = useRef(0);

  const { sendProgress, sendRecord } = useVideoAPI(refetchFunc);

  const containerRef = useRef<HTMLDivElement>(null);
  const [showIcon, setShowIcon] = useState(false);
  const [iconType, setIconType] = useState<
    'play' | 'pause' | 'volumeUp' | 'volumeDown' | 'backward' | 'forward'
  >('play');

  const { playing, volume, allowSeek, playbackRate, url } = state;

  const [playerKey, setPlayerKey] = useState('');
  const sendVideoProgress = useMutation({
    mutationFn: (data: {
      contentId: number;
      chapterId: number;
      kitId: number;
      courseId: number;
      sequenceId: number;
    }) => axios.post('/cms-module/api/v1/video/progress', data),
    onSuccess: () => {
      refetchFunc();
    },
  });

  // 최신 상태를 참조하기 위한 useRef
  const playingRef = useRef(playing);
  const volumeRef = useRef(volume);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    const { kitId, contentId, chapterId, courseId, sequenceId } = initialState;
    const key = `player-${Date.now()}`;
    setPlayerKey(key);

    return () => {
      if (contentId && chapterId && kitId && sequenceId) {
        sendVideoProgress.mutate({
          contentId: contentId,
          chapterId: chapterId,
          kitId: kitId,
          courseId: courseId || 1,
          sequenceId: sequenceId,
        });
      }
    };
  }, [initialState]);

  const updateProgress = useCallback(() => {
    if (playingRef.current && !isLoading) {
      cumulativePlaybackTimeRef.current += 1;
      if (cumulativePlaybackTimeRef.current >= 10) {
        cumulativePlaybackTimeRef.current = 0;
        // API 호출
        const currentTime = Math.ceil(playerRef.current?.getCurrentTime() || 0);
        const playbackRate =
          playerRef.current?.getInternalPlayer().playbackRate;
        console.log(currentTime);
        sendRecord({
          contentId: state.contentId || 0,
          chapterId: state.chapterId || 0,
          kitId: state.kitId || 0,
          courseId: 1,
          sequenceId: state.sequenceId || 0,
          videoStartTime: startTimeRef.current || 0,
          videoEndTime: currentTime,
          speed: playbackRate || 1,
        });
        // startTime 업데이트
        startTimeRef.current = currentTime;
      }
    }
  }, [playerRef, isLoading]);

  useEffect(() => {
    if (playing && !isLoading) {
      const interval = setInterval(() => {
        updateProgress();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [playing, isLoading, updateProgress]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handlePlayPause();
        setIconType(playingRef.current ? 'pause' : 'play');
      } else if (event.code === 'ArrowUp') {
        event.preventDefault();
        const newVolume = Math.min(volumeRef.current + 0.1, 1);
        handleVolumeChange(newVolume);
        setIconType('volumeUp');
      } else if (event.code === 'ArrowDown') {
        event.preventDefault();
        const newVolume = Math.max(volumeRef.current - 0.1, 0);
        handleVolumeChange(newVolume);
        setIconType('volumeDown');
      } else if (event.code === 'ArrowLeft') {
        event.preventDefault();
        handleRewind();
        setIconType('backward');
      } else if (event.code === 'ArrowRight') {
        event.preventDefault();
        handleForward();
        setIconType('forward');
      }
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 500);
    };

    const containerElement = containerRef.current;
    if (containerElement) {
      containerElement.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [handlePlayPause, handleVolumeChange, handleRewind, handleForward]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    if (playing) {
      setIsHover(false);
    }
  };

  return (
    <div
      className='player-wrapper'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      ref={containerRef}
    >
      {isLoading && (
        <div className='absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-white'></div>
        </div>
      )}
      <ReactPlayer
        key={playerKey}
        ref={playerRef}
        playing={playing}
        volume={volume}
        playbackRate={playbackRate}
        url={url}
        controls={false}
        muted={state.muted}
        // 나머지 props는 동일
        onDuration={handleDuration}
        onProgress={handleProgress}
        onReady={handleReady}
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
        className='react-player'
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
            },
          },
          file: {
            hlsVersion: '1.5.14',
            hlsOptions: {
              manifestLoadPolicy: {
                default: {
                  maxTimeToFirstByteMs: Infinity,
                  maxLoadTimeMs: 20000,
                  timeoutRetry: {
                    maxNumRetry: 2,
                    retryDelayMs: 0,
                    maxRetryDelayMs: 0,
                  },
                  errorRetry: {
                    maxNumRetry: 5,
                    retryDelayMs: 100000,
                    maxRetryDelayMs: 800000,
                  },
                },
              },
            },
          },
        }}
        width='100%'
        height='100%'
      />
      <div className='absolute inset-0 flex items-center justify-center'>
        {showIcon && (
          <div className='relative'>
            <div className='rounded-full bg-black p-4'>
              {iconType === 'play' && <FaPlay size={40} color='white' />}
              {iconType === 'pause' && <FaPause size={40} color='white' />}
              {iconType === 'volumeUp' && (
                <FaVolumeUp size={40} color='white' />
              )}
              {iconType === 'volumeDown' && (
                <FaVolumeDown size={40} color='white' />
              )}
              {iconType === 'backward' && (
                <FaBackward size={40} color='white' />
              )}
              {iconType === 'forward' && <FaForward size={40} color='white' />}
            </div>
            <div className='absolute inset-0 animate-ping rounded-full bg-black bg-opacity-50'></div>
          </div>
        )}
      </div>
      {isHover && (
        <ControlBar
          state={state}
          onPlayPause={handlePlayPause}
          onVolumeChange={handleVolumeChange}
          onToggleMute={toggleMute}
          onSeek={handleSeekChange}
          onSeekMouseDown={seekMouseDown}
          onSeekMouseUp={seekMouseUp}
          allowSeek={allowSeek as boolean}
          onSubtitleChange={handleSubtitleChange}
          onPlaybackRateChange={handlePlaybackChange}
        />
      )}
    </div>
  );
};

export default React.memo(VideoPlayerContainer);
