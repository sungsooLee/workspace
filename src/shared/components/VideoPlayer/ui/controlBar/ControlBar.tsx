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

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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

  const { played, duration } = state;

  return (
    <>
      <div className='absolute bottom-0 flex w-full flex-col bg-black bg-opacity-50 p-2'>
        <div className='flex w-full'>
          <SeekSlider
            played={state.played}
            loaded={state.loaded}
            duration={state.duration}
            onSeek={handleSeekChange}
            onSeekMouseDown={onSeekMouseDown}
            onSeekMouseUp={onSeekMouseUp}
            allowSeek={allowSeek}
          />
        </div>
        {/* <div> */}
        <div className='flex w-full justify-between'>
          <div className='flex items-baseline space-x-4'>
            <PlayPause playing={state.playing} onPlayPause={onPlayPause} />
            <VolumeControl
              isMuted={state.muted}
              onToggleMute={onToggleMute}
              volume={state.volume}
              onChangeVolume={onVolumeChange}
            />
            <div>
              <p className='text-white'>
                {formatTime(played * duration)} / {formatTime(duration)}
              </p>
            </div>
          </div>
          <div className='flex items-center space-x-4'>
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
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default ControlBar;
