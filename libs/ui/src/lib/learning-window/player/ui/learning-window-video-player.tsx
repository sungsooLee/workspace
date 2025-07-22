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

enum EnVideoQualityState {
  AUTO = -1,
  Q1080P = 1080,
  Q720P = 720,
  Q480P = 480,
}

const LearningWindowVideoPlayerComponent: FC<any> = () => {
  const [videoUrl, setVideoUrl] = useState();
  const [videoStart, setVideoStart] = useState<number>(0);
  const [qualityState, setQualityState] = useState<EnVideoQualityState>(EnVideoQualityState.AUTO);
  const [playConfig, setPlayConfig] = useState<Config>();
  const { baseInfo, playInfo, videoInfo, funcInfo } = useLearningWindow();

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
  };

  const handleOnReady = () => {
    console.log('handleOnReady');
    player.setSeconds(videoInfo.lastVideoEndTime);
    setVideoStart(videoInfo.lastVideoEndTime);
  };

  useEffect(() => {
    if (!videoInfo) return;
    console.log('videoInfo', videoInfo);
    player.setVideoInfo(videoInfo);
    setVideoUrl(videoInfo.masterVideo);
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
                url={videoUrl}
                ref={player.playerRef}
                playing={player.playing}
                volume={player.volume}
                muted={player.muted}
                progressInterval={1000 * 10}
                onProgress={player.onProgress}
                onDuration={player.onDuration}
                onEnded={handleVideoEnd}
                onReady={handleOnReady}
                onBuffer={player.onBuffer}
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
