import { FC, useCallback, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import { useVideoPlayer } from '../../../video-player/hooks/video-player.hook';
import { VideoPlayer } from '../../../video-player/video-player';
import { VideoPlayerContainer } from '../../../video-player/video-player-container';
import { useLearningWindow } from '../../learnway-learning-window.store';

const styles = isMobile ? stylesMobile : stylesWeb;

const LearningWindowVideoPlayerComponent: FC<any> = () => {
  const { videoInfo, funcInfo } = useLearningWindow();

  const handleOnProgress = (state: any) => {
    funcInfo?.videoOnProgress(state);
  };
  const player = useVideoPlayer({ onProgressCallback: handleOnProgress });

  useEffect(() => {
    console.log('videoInfo', videoInfo);
    player.setFraction(videoInfo.progress);
    player.togglePlay();
  }, [videoInfo]);

  return (
    <div className={styles.start}>
      <VideoPlayerContainer
        ref={player.playerContainerRef}
        {...player}
        showCurriculumSection={false}
      >
        <VideoPlayer
          ref={player.playerRef}
          playing={player.playing}
          progressInterval={1000 * 10}
          onProgress={player.onProgress}
          onDuration={player.onDuration}
          url={videoInfo.masterVideo}
        />
      </VideoPlayerContainer>
    </div>
  );
};

export const LearningWindowVideoPlayer = LearningWindowVideoPlayerComponent;
