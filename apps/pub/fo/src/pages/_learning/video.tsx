import { useState, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';

import { VideoSettingPopup } from '../../features/learning';

import styles from '@learnway/styles/fo/pages/_learning/learning.module.css';

import video from '@learnway/styles/fo/assets/images/temp/video.mp4';
import { useModal } from '@learnway/ui/modal';

export const Route = createFileRoute('/_learning/video')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert, openModal } = useModal();

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
    const video = {
      contentUuid: 'd8e6f50c-abec-470e-93c1-ac0695c259d2',
      contentName: '김석태  0724 - ttimes01',
      masterVideo: '/upload/content/video/2025/5/3/master.m3u8',
      encodedVideos: [
        {
          contentUuid: 'd8e6f50c-abec-470e-93c1-ac0695c259d2',
          m3u8Url: '/upload/content/video/2025/5/3/720/playlist.m3u8',
          height: 720,
          width: 1280,
          filePath: 'upload/content/video/2025/5/3/720/playlist.m3u8',
        },
        {
          contentUuid: 'd8e6f50c-abec-470e-93c1-ac0695c259d2',
          m3u8Url: '/upload/content/video/2025/5/3/master.m3u8',
          height: 0,
          width: 0,
          filePath: 'upload/content/video/2025/5/3/master.m3u8',
        },
        {
          contentUuid: 'd8e6f50c-abec-470e-93c1-ac0695c259d2',
          m3u8Url: '/upload/content/video/2025/5/3/1080/playlist.m3u8',
          height: 1080,
          width: 1920,
          filePath: 'upload/content/video/2025/5/3/1080/playlist.m3u8',
        },
        {
          contentUuid: 'd8e6f50c-abec-470e-93c1-ac0695c259d2',
          m3u8Url: '/upload/content/video/2025/5/3/360/playlist.m3u8',
          height: 360,
          width: 540,
          filePath: 'upload/content/video/2025/5/3/360/playlist.m3u8',
        },
      ],
      videoDuration: 1032,
      lastVideoEndTime: 42,
      progress: 4,
      languageCountryCode: 'KO',
      encodedAudios: [
        {
          contentUuid: 'd8e6f50c-abec-470e-93c1-ac0695c259d2',
          fileUrl: '/upload/content/video/2025/5/3/audio/audio_2x.mp3',
          filePath: 'upload/content/video/2025/5/3/audio/audio_2x.mp3',
        },
        {
          contentUuid: 'd8e6f50c-abec-470e-93c1-ac0695c259d2',
          fileUrl: '/upload/content/video/2025/5/3/audio/audio_1x.mp3',
          filePath: 'upload/content/video/2025/5/3/audio/audio_1x.mp3',
        },
      ],
    };
    setTimeout(() => {
      console.log('11111111111111111');
      player.setVideoInfo(video);
    }, 1000);
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
                onReady={player.onReady}
                onBuffer={player.onBuffer}
                config={player.videoConfig}
                url={player.playUrl}
              />
            </VideoPlayerContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
