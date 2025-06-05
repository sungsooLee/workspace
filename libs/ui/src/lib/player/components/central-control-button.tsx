import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { PlayerContainerProps } from '../types';

const CentralControlButton = ({
  playing,
  handleForward,
  handleRewind,
  togglePlay,
}: Pick<PlayerContainerProps, 'playing' | 'handleRewind' | 'togglePlay' | 'handleForward'>) => {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-6">
      <button onClick={handleRewind} className="rounded-full bg-white/20 p-3 text-white">
        <SkipBack size={32} />
      </button>
      <button onClick={togglePlay} className="rounded-full bg-white/30 p-4 text-white">
        {playing ? <Pause size={32} /> : <Play size={32} />}
      </button>
      <button onClick={handleForward} className="rounded-full bg-white/20 p-3 text-white">
        <SkipForward size={32} />
      </button>
    </div>
  );
};

export default CentralControlButton;
