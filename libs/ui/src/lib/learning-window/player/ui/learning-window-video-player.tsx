import { FC, useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import { useVideoPlayer } from '../../../video-player/hooks/video-player.hook';
import { VideoPlayer } from '../../../video-player/video-player';
import { VideoPlayerContainer } from '../../../video-player/video-player-container';
import { useLearningWindow } from '../../learnway-learning-window.store';

const styles = isMobile ? stylesMobile : stylesWeb;

const LearningWindowVideoPlayerComponent: FC<any> = () => {
  const { baseInfo, playInfo, videoInfo, funcInfo } = useLearningWindow();
  const [videoStart, setVideoStart] = useState<number>(0);

  const handleOnProgress = (state: any) => {
    console.log(`date check ; ${videoStart} -> ${state.playedSeconds}`, playInfo);
    const payload = {
      courseSequenceId: baseInfo?.sequenceId,
      courseId: baseInfo?.courseId,
      curriculumId: baseInfo?.curriculumId,
      moduleId: playInfo?.moduleId,
      lessonId: playInfo?.lessonId,
      contentUuid: playInfo?.contentUuid,
      videoStartTime: videoStart,
      videoEndTime: state.playedSeconds,
      speed: state.speed,
    };
    setVideoStart(state.playedSeconds);

    funcInfo?.videoOnProgress(payload);
  };

  const player = useVideoPlayer({ onProgressCallback: handleOnProgress });

  useEffect(() => {
    console.log('videoInfo', videoInfo);
    setTimeout(() => {
      player.togglePlay();
      player.setSeconds(videoInfo.lastVideoEndTime);
      setVideoStart(videoInfo.lastVideoEndTime);
    }, 500);
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
