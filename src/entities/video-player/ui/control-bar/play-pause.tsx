import { FaPause, FaPlay } from 'react-icons/fa';

type PlayPauseProps = {
  playing: boolean;
  onPlayPause: () => void;
};

const PlayPause = ({ playing, onPlayPause }: PlayPauseProps) => {
  return (
    <button onClick={onPlayPause} className='text-white'>
      {playing ? <FaPause /> : <FaPlay />}
    </button>
  );
};

export default PlayPause;
