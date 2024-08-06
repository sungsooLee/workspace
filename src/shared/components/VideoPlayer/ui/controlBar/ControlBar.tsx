import { VideoState } from '../../model/model';
import FullScreen from './FullScreen';
import PlayPause from './PlayPause';
import PlaybackRateSelect from './PlaybackRateSelect';
import SeekSlider from './SeekSlider';
import SubtitlesSelect from './SubtitlesSelect';
import VolumeControl from './VolumeControl';

interface ControlBarProps {
  state: VideoState;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onSeek: (played: number) => void;
  onSeekMouseDown: () => void;
  onSeekMouseUp: () => void;
  allowSeek: boolean;
  onSubtitleChange: (label: string) => void;
  onPlaybackRateChange: (rate: number) => void;
}

const ControlBar = ({
  state,
  onPlayPause,
  onVolumeChange,
  onToggleMute,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  allowSeek,
  onSubtitleChange,
  onPlaybackRateChange,
}: ControlBarProps) => {
  const handleSeekChange = (played: number) => {
    onSeek(played);
  };

  return (
    <div className='absolute bottom-0 left-0 right-0 flex items-center space-x-4 bg-black bg-opacity-50 p-2'>
      <PlayPause playing={state.playing} onPlayPause={onPlayPause} />
      <VolumeControl
        isMuted={state.muted}
        onToggleMute={onToggleMute}
        volume={state.volume}
        onChangeVolume={onVolumeChange}
      />
      <SeekSlider
        played={state.played}
        loaded={state.loaded}
        duration={state.duration}
        onSeek={handleSeekChange}
        onSeekMouseDown={onSeekMouseDown}
        onSeekMouseUp={onSeekMouseUp}
        allowSeek={allowSeek}
      />
      <PlaybackRateSelect
        playbackRate={state.playbackRate}
        onPlaybackRateChange={onPlaybackRateChange}
      />
      <SubtitlesSelect
        subtitles={state.subtitles || []}
        selectedSubtitle={state.subtitle || ''}
        onSubtitleChange={onSubtitleChange}
      />
      <FullScreen />
    </div>
  );
};

export default ControlBar;
