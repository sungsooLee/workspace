import { useRef, useState } from 'react';

type PlaybackRateProps = {
  playbackRate: number;
  // playbackRates: number[];
  onPlaybackRateChange: (rate: number) => void;
};

const PlaybackRateSelect = ({
  playbackRate,
  // playbackRates,
  onPlaybackRateChange,
}: PlaybackRateProps) => {
  const playbackRates = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
  const [showDropdown, setShowDropdown] = useState(false);
  const playbackRateRef = useRef<HTMLDivElement>(null);

  const handlePlaybackRateBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!playbackRateRef.current?.contains(e.relatedTarget as Node)) {
      setShowDropdown(false);
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <>
      <div
        className='relative'
        ref={playbackRateRef}
        onBlur={handlePlaybackRateBlur}
      >
        <button
          onClick={handleDropdownToggle}
          className='w-40pxr rounded border border-white text-white'
          aria-haspopup='listbox'
        >
          {playbackRate}x
        </button>
        {showDropdown && (
          <ul
            className={`absolute bottom-full right-0 mb-1 mt-1 rounded border border-gray-700 bg-black text-white shadow-lg`}
            tabIndex={-1}
          >
            {playbackRates.map((rate) => (
              <li
                key={rate}
                onClick={() => {
                  onPlaybackRateChange(rate);
                  setShowDropdown(false);
                }}
                className={`cursor-pointer ${playbackRate === rate ? 'bg-gray-700 font-bold' : ''}`}
                role='option'
              >
                {rate}x
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default PlaybackRateSelect;
