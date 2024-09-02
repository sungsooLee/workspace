import ReactPlayer from 'react-player/lazy';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import ControlBar from './controlBar/ControlBar';
import React, { useEffect, useRef, useState } from 'react';
import Watermark from '../../Watermark/Watermark';
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
import useContentStore from '@/shared/stores/useContentStore';
import { Chapter } from '@/features/chapter';
import { Content } from '@/entities/content';

const VideoPlayerContainer = React.memo((initialState: any) => {
  const [isHover, setIsHover] = useState(true);
  // const { email } = useAuthStore.getState();
  // const tracks = [
  //   {
  //     kind: 'subtitles',
  //     src: '/subtitles/jap.vtt',
  //     srcLang: 'ja',
  //     label: 'Japanese',
  //     default: true,
  //   },
  //   {
  //     kind: 'subtitles',
  //     src: '/subtitles/spa.vtt',
  //     srcLang: 'es',
  //     label: 'Spanish',
  //     // default: true,
  //   },
  //   {
  //     kind: 'subtitles',
  //     src: '/subtitles/thai.vtt',
  //     srcLang: 'th',
  //     label: 'Thai',
  //   },
  //   {
  //     kind: 'subtitles',
  //     src: '/subtitles/viet.vtt',
  //     srcLang: 'vi',
  //     label: 'Vietnamese',
  //   },
  // ];

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
    handleReady,
    handleSubtitleChange,
    handleBuffer,
    handleBufferEnd,
    handlePlaybackChange,
    // handleError,
    handleRewind,
    handleForward,
    isLoading,
    // isBuffering,
  } = useVideoPlayer(initialState);
  const containerRef = useRef<HTMLDivElement>(null);

  const [showIcon, setShowIcon] = useState(false);
  const [iconType, setIconType] = useState<
    'play' | 'pause' | 'volumeUp' | 'volumeDown' | 'backward' | 'forward'
  >('play');

  const { playing, volume, allowSeek, playbackRate, url } = state;

  const [playerKey, setPlayerKey] = useState('');
  const { chapterList, fetchChapterList } = useContentStore((state) => state);
  const sendVideoProgress = useMutation({
    mutationFn: (data: {
      contentId: number;
      chapterId: number;
      kitId: number;
      courseId: number;
      sequenceId: number;
    }) => axios.post('/cms-module/api/v1/video/progress', data),
    onSuccess: (response) => {
      const responseData = response.data.data;
      const { chapterId, contentId, videoProgressStatus } = responseData;
      console.log(chapterList);
      console.log(responseData);
      const newChapterList = chapterList.map((chapter: Chapter) => {
        if (chapter.chapterId === chapterId) {
          const contentSeqList = chapter.contentSeqList.map(
            (content: Content) => {
              if (content.contentId === contentId) {
                return {
                  ...content,
                  status: videoProgressStatus,
                };
              }
              return content;
            }
          );
          return {
            ...chapter,
            contentSeqList,
          };
        }
        return chapter;
      });
      console.log(newChapterList);
      fetchChapterList(newChapterList);
    },
  });

  useEffect(() => {
    const { kitId, contentId, playing, chapterId, courseId, sequenceId } =
      initialState;
    console.log('@@@@mount@@@@@');
    console.log(
      'KitId= ',
      initialState.kitId,
      'ContentId = ',
      initialState.contentId,
      'Playing = ',
      initialState.playing
    );
    const key = `player-${Date.now()}`;
    setPlayerKey(key);

    return () => {
      console.log('@@@unmount@@@');
      console.log(
        'KitId= ',
        kitId,
        'ContentId = ',
        contentId,
        'chapterId = ',
        chapterId,
        'sequenceId = ',
        sequenceId
      );
      console.log(initialState);
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();

        handlePlayPause();
        setIconType(state.playing ? 'pause' : 'play');
      } else if (event.code === 'ArrowUp') {
        event.preventDefault();
        console.log(volume + 0.1);
        if (volume + 0.1 < 1) {
          handleVolumeChange(volume + 0.1);
        }
        setIconType('volumeUp');
      } else if (event.code === 'ArrowDown') {
        event.preventDefault();

        // handleVolumeChange(volume - 0.1);
        if (volume - 0.1 >= 0) {
          handleVolumeChange(volume - 0.1);
        }
        setIconType('volumeDown');
      } else if (event.code === 'ArrowLeft') {
        event.preventDefault();

        setIconType('backward');
        handleRewind();
      } else if (event.code === 'ArrowRight') {
        event.preventDefault();

        setIconType('forward');
        handleForward();
      }
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 500);
    };

    const containerElement = containerRef.current;
    if (containerElement)
      containerElement.addEventListener('keydown', handleKeyDown);

    return () => {
      if (containerElement)
        containerElement.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePlayPause, handleVolumeChange, handleRewind, handleForward]);

  const handleMouseEnter = () => {
    if (!isHover) {
      setIsHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (playing && isHover) {
      setIsHover(false);
    }
  };

  return (
    <>
      <div
        className='player-wrapper'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        ref={containerRef}
      >
        {isLoading.current && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-white'></div>
          </div>
        )}
        <ReactPlayer
          key={playerKey}
          ref={playerRef}
          playing={playing || false}
          volume={volume || 0.5}
          playbackRate={playbackRate || 1}
          url={url || ''}
          controls={false}
          muted={true}
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
          width={'100%'}
          height={'100%'}
          onDuration={handleDuration}
          onProgress={handleProgress}
          onReady={handleReady}
          onBuffer={handleBuffer}
          onBufferEnd={handleBufferEnd}
          className='react-player'
        />
        <div className='absolute inset-0 flex animate-fadeout items-center justify-center transition duration-1000'>
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
                {iconType === 'forward' && (
                  <FaForward size={40} color='white' />
                )}
              </div>
              <div className='absolute inset-0 animate-ping rounded-full bg-black bg-opacity-50'></div>
            </div>
          )}
        </div>
        {/* )} */}
        {/* <Watermark
          src={url}
          text={email}
          width='100%'
          height='100%'
          opacity={0.25}
          fontSize='2em'
          rotate='-45'
          
        /> */}

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
    </>
  );
});

export default VideoPlayerContainer;
