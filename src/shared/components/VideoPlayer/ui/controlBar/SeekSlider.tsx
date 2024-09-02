interface SeekSliderProps {
  played: number;
  loaded: number;
  duration: number;
  onSeek: (time: number) => void;
  onSeekMouseDown: () => void;
  onSeekMouseUp: () => void;
  allowSeek: boolean;
}

const SeekSlider = ({
  played,
  loaded,
  onSeek,
  onSeekMouseDown,
  onSeekMouseUp,
  allowSeek,
}: SeekSliderProps) => {
  return (
    <div className='video-progress-container'>
      <div className='video-progress group w-full'>
        <div className='flex flex-row items-center gap-16pxr'>
          {/* {played && played >= 0 && ( */}
          <input
            // disabled={!allowSeek}
            type='range'
            min={0}
            max={0.999999}
            step='any'
            value={played}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            onMouseDown={onSeekMouseDown}
            onMouseUp={onSeekMouseUp}
            className='seek-slider'
            // style={{ '--loaded': `${loaded * 100}%` } as React.CSSProperties}
          />
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default SeekSlider;
