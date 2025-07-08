import { useEffect, useMemo, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import { useGetCurriculumnDetail } from '@entities/curriculum/service/curriculum.hook';
import { useGetScormRteScoInfo } from '@entities/learning-resource/service/scorm-rte.hook';
import { useGetContentDetail } from '@entities/learning-resource/service/content.hook';

import {
  EnContentType,
  LearningWindowLayout,
  useLearningWindow,
  ScormPlayerConfigProperties,
  LearningWindowBaseInfo,
} from '@learnway/ui';
import { ScormRteService } from '@entities/learning-resource/api/scorm-rte';
import { useVideoWatchLog } from '@entities/learning-resource/service/video.hook';
import { useGetBlogResource } from '@entities/learning-resource/service/blog.hook';

export const Route = createFileRoute('/_learning/learning-window')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const [scormConfig, setScormConfig] = useState<ScormPlayerConfigProperties>();
  const [videoConfig, setVideoConfig] = useState<any>();
  const [videoStart, setVideoStart] = useState<number>(0);
  const [blogConfig, setBlogConfig] = useState<any>();

  const {
    baseInfo,
    playInfo,
    setVideoInfo,
    setScormInfo,
    setBlogInfo,
    setBaseInfo,
    setCurriculum,
    clearInfo,
    setFuncInfo,
  } = useLearningWindow();
  const { data: scormInfo } = useGetScormRteScoInfo(scormConfig);
  const { data: curriculum } = useGetCurriculumnDetail(baseInfo?.curriculumId);
  const { data: videoInfo } = useGetContentDetail(videoConfig?.contentUuid);
  const { data: blogInfo } = useGetBlogResource(blogConfig?.contentUuid);
  const { watchLog } = useVideoWatchLog();

  const handleVideoProgress = (state: any) => {
    if (playInfo?.contentType === EnContentType.VIDEO) {
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
      console.log('handleVideo', payload);
      watchLog(payload);
    }
  };

  useEffect(() => {
    if (!scormInfo) return;
    setScormInfo(scormInfo);
  }, [scormInfo]);

  useEffect(() => {
    if (!videoInfo) return;
    console.log('vidoeInfo', videoInfo);
    setVideoStart(0);
    setVideoInfo(videoInfo);
  }, [videoInfo]);

  useEffect(() => {
    if (!blogInfo) return;
    setBlogInfo(blogInfo);
  }, [blogInfo]);

  useEffect(() => {
    if (!playInfo) return;
    console.log('playInfo config', playInfo);
    clearInfo();
    switch (playInfo.contentType) {
      case EnContentType.SCORM:
        setScormConfig({
          contentUuid: playInfo.contentUuid,
          curriculumId: playInfo.curriculumId,
          orgnId: playInfo.orgnId,
          sequenceId: playInfo.sequenceId,
          courseId: playInfo.courseId,
          scoId: playInfo.scoId,
        });
        break;
      case EnContentType.VIDEO:
        setVideoConfig({
          contentUuid: playInfo.contentUuid,
        });
        break;
      case EnContentType.BLOG:
        setBlogConfig({
          contentUuid: playInfo.contentUuid,
        });
        break;
    }
  }, [playInfo]);

  useEffect(() => {
    if (!curriculum) return;
    setCurriculum(curriculum);
  }, [curriculum]);

  useEffect(() => {
    const learningInfo = {
      ...routerState.location.state,
    } as LearningWindowBaseInfo;
    console.log('state info ', learningInfo);
    if (learningInfo.curriculumId) {
      setBaseInfo(learningInfo);
    }

    setFuncInfo({
      curriculum: (payload: any) => {
        console.log(payload);
      },
      scormInitialize: ScormRteService.initialize,
      scormCommit: ScormRteService.commit,
      videoOnProgress: handleVideoProgress,
    });
  }, []);

  return <LearningWindowLayout />;
}
