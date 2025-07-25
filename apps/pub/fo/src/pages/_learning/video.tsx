import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  useModal,
  Button,
  VideoPlayer,
  VideoPlayerContainer,
  useLearningWindow,
  useVideoPlayer,
} from '@learnway/ui';
import { VideoSettingPopup, VideoSubsettingPopup } from '../../features/learning';

import styles from '@learnway/styles/fo/pages/_learning/learning.module.css';

import video from '@learnway/styles/fo/assets/images/temp/video.mp4';

export const Route = createFileRoute('/_learning/video')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert, open: openModal } = useModal();

  // 완료 alert
  const handleCompleteAlert = () => {
    openAlert({
      type: 'complete',
      title: <>완료되었습니다.</>,
      content: <>요청하신 작업이 정상적으로 완료되었습니다.</>,
    });
  };

  // 오류 alert
  const handleErrorAlert = () => {
    openAlert({
      type: 'error',
      title: <>오류가 발생하였습니다.</>,
      content: (
        <>
          요청하신 작업을 실행할 수 없습니다.
          <br />
          다시 확인해주세요.
        </>
      ),
    });
  };

  // 서버 오류 alert
  const handleServerErrorAlert = () => {
    openAlert({
      type: 'warning',
      title: <>서버 오류가 발생하였습니다.</>,
      content: (
        <>
          요청하신 작업을 실행할 수 없습니다.
          <br />
          담당자에게 문의해주세요.
        </>
      ),
    });
  };

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
  useEffect(() => {
    console.log('end video');
    return () => {
      handleVideoEnd();
    };
  }, []);

  return (
    // 퍼블수정 20250717 마크업 수정
    <div className={`${styles.start} ${styles.video}`}>
      <div className={styles.video_wrap}>
        <div className={styles.video_area}>
          <div className={styles.video_contents}>
            {/* 비디오 영역 */}
            <VideoPlayerContainer ref={player.playerContainerRef} player={player}>
              <VideoPlayer
                ref={player.playerRef}
                playing={player.playing}
                volume={player.volume}
                muted={player.muted}
                progressInterval={1000 * 10}
                onProgress={player.onProgress}
                onDuration={player.onDuration}
                onEnded={handleVideoEnd}
                onBuffer={player.onBuffer}
                url={video}
              />
            </VideoPlayerContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
