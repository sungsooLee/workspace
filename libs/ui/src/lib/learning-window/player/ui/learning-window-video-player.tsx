import { FC, useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';
import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import { useVideoPlayer } from '../../../video-player/hooks/video-player.hook';
import { VideoPlayerContainer } from '../../../video-player/video-player-container';
import { useLearningWindow } from '../../learnway-learning-window.store';
import ReactPlayer, { Config } from 'react-player';
import { EnLibGlobalConst } from '@learnway/types';
import { TrackProps } from 'react-player/file';
import { VideoPlayer } from '../../../video-player/video-player';

const styles = isMobile ? stylesMobile : stylesWeb;

const LearningWindowVideoPlayerComponent: FC<any> = () => {
  const { baseInfo, playInfo, videoInfo, funcInfo, gotoBeforeLesson, gotoNextLesson } =
    useLearningWindow();

  const handleOnProgress = (state: any) => {
    if (state.playedSeconds - player.videoStart < 0) {
      player.setVideoStart(state.playedSeconds);
      return;
    }
    if (state.playedSeconds - player.videoStart >= 10) {
      const payload = {
        courseSequenceId: baseInfo?.sequenceId,
        courseId: baseInfo?.courseId,
        curriculumId: baseInfo?.curriculumId,
        moduleId: playInfo?.moduleId,
        lessonId: playInfo?.lessonId,
        contentUuid: playInfo?.contentUuid,
        videoStartTime: player.videoStart,
        videoEndTime: state.playedSeconds,
        speed: state.speed,
      };
      player.setVideoStart(state.playedSeconds);

      funcInfo?.videoOnProgress(payload);
    }
  };

  const player = useVideoPlayer({
    onProgressCallback: handleOnProgress,
    gotoBeforeLesson,
    gotoNextLesson,
  });

  const handleVideoEnd = () => {
    const payload = {
      courseSequenceId: baseInfo?.sequenceId,
      courseId: baseInfo?.courseId,
      curriculumId: baseInfo?.curriculumId,
      moduleId: playInfo?.moduleId,
      lessonId: playInfo?.lessonId,
      contentUuid: playInfo?.contentUuid,
    };
    funcInfo?.videoWatchStatistics(payload);
    player.togglePlay();
  };

  useEffect(() => {
    if (!videoInfo) return;
    console.log('videoInfo', videoInfo);
    player.setVideoInfo(videoInfo);
  }, [videoInfo]);
  useEffect(() => {
    return () => {
      handleVideoEnd();
    };
  }, []);

  return (
    <div className={`${styles.start} ${styles.video}`}>
      <div className={styles.video_wrap}>
        <div className={styles.video_area}>
          <div className={styles.video_contents}>
            <VideoPlayerContainer ref={player.playerContainerRef} player={player}>
              <VideoPlayer
                url={player.playUrl}
                ref={player.playerRef}
                playing={player.playing}
                volume={player.volume}
                muted={player.muted}
                progressInterval={100}
                onProgress={player.onProgress}
                onDuration={player.onDuration}
                onEnded={handleVideoEnd}
                onReady={player.onReady}
                onBuffer={player.onBuffer}
                config={player.videoConfig}
                //config={playConfig}
              />
            </VideoPlayerContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LearningWindowVideoPlayer = LearningWindowVideoPlayerComponent;
