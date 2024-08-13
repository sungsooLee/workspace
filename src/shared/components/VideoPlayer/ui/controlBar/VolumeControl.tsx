import { useEffect, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

type VolumeProps = {
  volume: number;
  onChangeVolume: (volume: number) => void;
  onToggleMute: () => void;
  isMuted: boolean;
};

const VolumeControl = ({
  volume,
  onChangeVolume,
  onToggleMute,
  isMuted,
}: VolumeProps) => {
  const [lastVolume, setLastVolume] = useState(volume);
  const [isHover, setIsHover] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);
  const volumeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMuted && volume > 0) {
      setLastVolume(volume);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        volumeRef.current &&
        !volumeRef.current.contains(event.target as Node)
      ) {
        setIsHover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleVolumeChange = (newVolume: number) => {
    if (isMuted && newVolume > 0) {
      onToggleMute();
    }
    onChangeVolume(newVolume);
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      onChangeVolume(lastVolume);
    } else {
      setLastVolume(volume);
      onChangeVolume(0);
    }
    onToggleMute();
  };
  return (
    <div
      className='relative flex items-center space-x-4'
      ref={volumeContainerRef}
    >
      <button onClick={handleMuteToggle} className='text-white'>
        {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
      <div className={`right-0 rounded bg-opacity-75 p-2`}>
        <input
          type='range'
          min={0}
          max={1}
          step='0.01'
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className={`h-1 w-24 cursor-pointer outline-none`}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
