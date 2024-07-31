import { VideoState } from '../../model/model';
import PlayPause from './play-pause';
import VolumeControl from './volume-control';

interface ControlBarProps {
  state: VideoState;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
  onProgressChange: (played: number) => void;
  onToggleMute: () => void;
}

const ControlBar = ({
  state,
  onPlayPause,
  onVolumeChange,
  onToggleMute,
}: ControlBarProps) => {
  return (
    <div className='absolute bottom-0 left-0 right-0 flex items-center space-x-4 bg-black bg-opacity-50 p-2'>
      <PlayPause playing={state.playing} onPlayPause={onPlayPause} />
      <VolumeControl
        isMuted={state.muted}
        onToggleMute={onToggleMute}
        volume={state.volume}
        onChangeVolume={onVolumeChange}
      />
    </div>
  );
};

export default ControlBar;
