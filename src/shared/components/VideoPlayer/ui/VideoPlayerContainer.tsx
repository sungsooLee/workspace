import ReactPlayer from 'react-player';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import ControlBar from './controlBar/ControlBar';
import { VideoPlayerProps, VideoState } from '../model/model';
import { useState } from 'react';

const VideoPlayerContainer = ({
  // videoUrl,
  lastPlayed,
  getAllowSeek,
}: VideoPlayerProps) => {
  const [isHover, setIsHover] = useState(true);
  const tracks = [
    {
      kind: 'subtitles',
      src: '/subtitles/jap.vtt',
      srcLang: 'ja',
      label: 'Japanese',
      default: true,
    },
    {
      kind: 'subtitles',
      src: '/subtitles/spa.vtt',
      srcLang: 'es',
      label: 'Spanish',
      // default: true,
    },
    {
      kind: 'subtitles',
      src: '/subtitles/thai.vtt',
      srcLang: 'th',
      label: 'Thai',
    },
    {
      kind: 'subtitles',
      src: '/subtitles/viet.vtt',
      srcLang: 'vi',
      label: 'Vietnamese',
    },
  ];
  const initialState: VideoState = {
    playing: false,
    volume: 0.5,
    playbackRate: 1.0,
    progress: 0,
    duration: 0,
    played: lastPlayed,
    muted: false,
    fullscreen: false,
    showSubtitles: false,
    loaded: 0,
    seeking: false,
    allowSeek: getAllowSeek,
    subtitles: tracks,
    subtitle: tracks[0].label,
    watchTime: 0,
    lastPlayedTime: lastPlayed,
    // url: 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4',
    // url: 'https://www.youtube.com/watch?v=_ngCLZ5Iz-0',
    // url: 'https://www.youtube.com/watch?v=ZCae_LPuzBU',
    url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  };
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
    handleError,
    isLoading,
  } = useVideoPlayer(initialState);
  const { playing, volume, allowSeek, playbackRate, url } = state;

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
        // className='video-container relative'
        className='player-wrapper'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isLoading && (
          <div className='absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-white'></div>
          </div>
        )}
        <ReactPlayer
          ref={playerRef}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          url={url}
          controls={false}
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                controls: 0,
                playsinline: 1,
                showinfo: 0,
                rel: 0,
                iv_load_policy: 3,
                modestbranding: 1,
              },
            },
            file: {
              forceVideo: true,
              tracks: tracks,
              attributes: {},
              // play : ppllaayy,
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
          onError={handleError}
          // waiting
          // player
          // light={isLoading ? 'https://placehold.it/640x360.jpg' : false}
        />
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
};

export default VideoPlayerContainer;
