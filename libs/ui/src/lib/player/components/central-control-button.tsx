import { PlayerContainerProps } from '../types';
import { IcoClock10Back, IcoClock10Forward, IcoPlayerPause, IcoPlayerPlay } from '@learnway/icons';

const CentralControlButton = ({
  playing,
  handleForward,
  handleRewind,
  togglePlay,
}: Pick<PlayerContainerProps, 'playing' | 'handleRewind' | 'togglePlay' | 'handleForward'>) => {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-6">
      <button onClick={handleRewind}>
        <IcoClock10Back className="h-[72px] w-[72px] text-white" />
      </button>
      <button onClick={togglePlay}>
        {playing ? (
          <IcoPlayerPause className="h-[72px] w-[72px] text-white" />
        ) : (
          <IcoPlayerPlay className="h-[72px] w-[72px] text-white" />
        )}
      </button>
      <button onClick={handleForward}>
        <IcoClock10Forward className="h-[72px] w-[72px] text-white" />
      </button>
    </div>
  );
};

export default CentralControlButton;
