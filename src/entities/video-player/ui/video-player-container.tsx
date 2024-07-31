import ReactPlayer from 'react-player';
import { useVideoPlayer } from '../hooks/use-video-player';
import ControlBar from './control-bar/control-bar';

const VideoPlayerContainer = () => {
  const {
    playerRef,
    state,
    handlePlayPause,
    handleVolumeChange,
    handleProgress,
    handleDuration,
    toggleMute,
  } = useVideoPlayer();
  const { playing, volume, played, duration, muted } = state;
  return (
    <>
      <div className='relative'>
        <ReactPlayer
          ref={playerRef}
          playing={playing}
          volume={volume}
          url='https://htavideo-gcp.hyundai-hta.com/20240716/140046823546/hls/manifest.m3u8'
        />
        <ControlBar
          state={state}
          onPlayPause={handlePlayPause}
          onVolumeChange={handleVolumeChange}
          onProgressChange={handleProgress}
          onToggleMute={toggleMute}
        />
      </div>
    </>
  );
};

export default VideoPlayerContainer;
