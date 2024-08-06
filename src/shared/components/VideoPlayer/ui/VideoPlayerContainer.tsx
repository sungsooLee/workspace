import ReactPlayer from 'react-player';
import { useVideoPlayer } from '../hooks/useVideoPlayer';
import ControlBar from './controlBar/ControlBar';
import { VideoPlayerProps, VideoState } from '../model/model';

const VideoPlayerContainer = ({
  videoUrl,
  lastPlayed,
  getAllowSeek,
}: VideoPlayerProps) => {
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
    lastPlayedTime: 0.8,
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
    isLoading,
  } = useVideoPlayer(initialState);
  const { playing, volume, allowSeek, playbackRate } = state;

  return (
    <>
      <div className='video-container relative'>
        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-white'></div>
          </div>
        )}
        <ReactPlayer
          ref={playerRef}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          url={videoUrl}
          config={{
            file: {
              tracks: tracks,
              // forceVideo: true,
            },
          }}
          width={'100%'}
          height={'100%'}
          onDuration={handleDuration}
          onProgress={handleProgress}
          onReady={handleReady}
          onBuffer={handleBuffer}
          onBufferEnd={handleBufferEnd}
          // light={isLoading ? 'https://placehold.it/640x360.jpg' : false}
        />
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
      </div>
      <div>{isLoading + ''}</div>
    </>
  );
};

export default VideoPlayerContainer;
