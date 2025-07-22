import { VideoPlayerContainerProps } from '../types';
import { IcoVideoStop, IcoVideoPlay, IcoNextPlayFill, IcoPrevPlayFill } from '@learnway/icons';
import { isMobile } from 'react-device-detect';

import styles from './central-control-button.module.css';

const CentralControlButton = ({
  playing,
  handleForward,
  handleRewind,
  togglePlay,
}: Pick<
  VideoPlayerContainerProps,
  'playing' | 'handleRewind' | 'togglePlay' | 'handleForward'
>) => {
  return (
    <div className={`${styles.start} ${styles.control}`}>
      <button onClick={handleRewind}>
        <IcoPrevPlayFill width={isMobile ? 32 : 44} height={isMobile ? 32 : 44} />
      </button>
      <button className={styles.btn_control} onClick={togglePlay}>
        {playing ? (
          <IcoVideoStop width={isMobile ? 32 : 44} height={isMobile ? 32 : 44} />
        ) : (
          <IcoVideoPlay width={isMobile ? 32 : 44} height={isMobile ? 32 : 44} />
        )}
      </button>
      <button onClick={handleForward}>
        <IcoNextPlayFill width={isMobile ? 32 : 44} height={isMobile ? 32 : 44} />
      </button>
    </div>
  );
};

export default CentralControlButton;
