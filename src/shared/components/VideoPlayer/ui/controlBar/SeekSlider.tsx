interface SeekSliderProps {
  played: number;
  loaded: number;
  duration: number;
  onSeek: (time: number) => void;
  onSeekMouseDown: () => void;
  onSeekMouseUp: () => void;
  allowSeek: boolean;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const SeekSlider = ({
  duration,
  played,
  loaded,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  allowSeek,
}: SeekSliderProps) => {
  return (
    <div className='video-progress group w-full'>
      <div className='flex flex-row items-center gap-16pxr'>
        <p className='text-white'>{formatTime(played * duration)}</p>
        <input
          disabled={!allowSeek}
          type='range'
          min={0}
          max={0.999999}
          step='any'
          value={played}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          onMouseDown={onSeekMouseDown}
          onMouseUp={onSeekMouseUp}
          className='w-full'
        />
        <p className='text-white'>{formatTime(duration)}</p>
      </div>
    </div>
  );
};

export default SeekSlider;
