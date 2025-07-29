import { useCallback, useEffect, useMemo, useState } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { t } from 'i18next';

import {
  LearnwayLearningWindowLayout,
  useLearningWindow,
  ScormPlayerConfigProperties,
  LearningWindowBaseInfo,
} from '@learnway/ui';
import {
  useVideoWatchInitialize,
  useVideoWatchLog,
} from '@entities/learning-resource/service/video.hook';
import { useGetCurriculumnDetail } from '@entities/curriculum';

import {
  ScormRteService,
  Html5Service,
  ImageService,
  ContentService,
  useGetScormRteScoInfo,
  useGetBlogResource,
  useGetHtml5Resource,
  useGetImageResource,
} from '@entities/learning-resource';
import { CmsEnContentType } from '@learnway/types';
import {
  useEtcContentManager,
  useGetEtcContentResource,
} from '@entities/learning-resource/service/etc-content.hook';

export const Route = createFileRoute('/_learning/learning-window')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const [scormConfig, setScormConfig] = useState<ScormPlayerConfigProperties>();
  const [ebookConfig, setEbookConfig] = useState<ScormPlayerConfigProperties>();
  const [videoConfig, setVideoConfig] = useState<any>();
  const [blogConfig, setBlogConfig] = useState<any>();
  const [htmlConfig, setHtmlConfig] = useState<any>();
  const [imageConfig, setImageConfig] = useState<any>();
  const [etcConfig, setEtcConfig] = useState<any>();

  const {
    baseInfo,
    playInfo,
    setVideoInfo,
    setScormInfo,
    setBlogInfo,
    setHtmlInfo,
    setEbookInfo,
    setGalleryInfo,
    setOtherInfo,
    setBaseInfo,
    setCurriculum,
    clearInfo,
    setFuncInfo,
  } = useLearningWindow();
  const { data: scormInfo } = useGetScormRteScoInfo(scormConfig);
  const { data: ebookInfo } = useGetScormRteScoInfo(ebookConfig);
  const { data: curriculum } = useGetCurriculumnDetail(baseInfo?.curriculumId);
  const { data: videoInfo } = useVideoWatchInitialize(videoConfig);
  const { data: blogInfo } = useGetBlogResource(blogConfig?.contentUuid);
  const { data: htmlInfo } = useGetHtml5Resource(htmlConfig?.contentUuid);
  const { data: imageInfo } = useGetImageResource(imageConfig?.contentUuid);
  const { data: etcInfo } = useGetEtcContentResource(etcConfig?.contentUuid);
  const { download } = useEtcContentManager();

  const { watchLog, watchLogStatistics } = useVideoWatchLog();

  const handleVideoProgress = async (payload: any) => {
    console.log('handleVideo', payload);
    watchLog(payload);
  };
  const handleVideoWatchStatistics = async (payload: any) => {
    console.log('handelVideoWatchStatistics', payload);
    watchLogStatistics(payload);
  };
  const handleOtherClickButton = async (playInfo: LearningWindowBaseInfo, otherInfo: any) => {
    console.log('handleOtherClikcButton called');
    if (otherInfo.contentType === CmsEnContentType.ETC) {
      download({
        courseSequenceId: playInfo.sequenceId,
        courseId: playInfo.courseId,
        curriculumId: playInfo.curriculumId,
        moduleId: playInfo.moduleId,
        lessonId: playInfo.lessonId,
        contentUuid: otherInfo.contentUuid,
      });
    }
  };

  useEffect(() => {
    if (!scormInfo) return;
    setScormInfo(scormInfo);
  }, [scormInfo]);

  useEffect(() => {
    if (!videoInfo) return;
    setVideoInfo(videoInfo);
  }, [videoInfo]);

  useEffect(() => {
    if (!blogInfo) return;
    setBlogInfo(blogInfo);
  }, [blogInfo]);
  useEffect(() => {
    if (!htmlInfo) return;
    setHtmlInfo(htmlInfo);
  }, [htmlInfo]);

  useEffect(() => {
    if (!imageInfo) return;
    setGalleryInfo(imageInfo);
  }, [imageInfo]);

  useEffect(() => {
    if (!htmlInfo) return;
    setEbookInfo(htmlInfo);
  }, [ebookInfo]);

  useEffect(() => {
    if (!etcInfo) return;
    console.log('etcInfo', etcInfo);
    setOtherInfo({ ...etcInfo, label: etcInfo?.fileInfo?.fileName });
  }, [etcInfo]);

  const clearConfig = () => {
    setScormConfig(undefined);
    setEbookConfig(undefined);
    setVideoConfig(undefined);
    setBlogConfig(undefined);
    setHtmlConfig(undefined);
    setImageConfig(undefined);
    setEtcConfig(undefined);
  };

  useEffect(() => {
    if (!playInfo) return;
    console.log('playInfo config', playInfo);
    clearInfo();
    clearConfig();
    switch (playInfo.contentType) {
      case CmsEnContentType.EBOOK:
        setEbookConfig({
          contentUuid: playInfo.contentUuid,
          curriculumId: playInfo.curriculumId,
          orgnId: playInfo.orgnId,
          sequenceId: playInfo.sequenceId,
          courseId: playInfo.courseId,
          scoId: playInfo.scoId,
        });
        break;
      case CmsEnContentType.SCORM:
        setScormConfig({
          contentUuid: playInfo.contentUuid,
          curriculumId: playInfo.curriculumId,
          orgnId: playInfo.orgnId,
          sequenceId: playInfo.sequenceId,
          courseId: playInfo.courseId,
          scoId: playInfo.scoId,
        });
        break;
      case CmsEnContentType.VIDEO:
        setVideoConfig({
          contentUuid: playInfo.contentUuid,
          courseSequenceId: playInfo.sequenceId,
          courseId: playInfo.courseId,
          curriculumId: playInfo.curriculumId,
          moduleId: playInfo.moduleId,
          lessonId: playInfo.lessonId,
        });
        break;
      case CmsEnContentType.BLOG:
        setBlogConfig({
          contentUuid: playInfo.contentUuid,
        });
        break;
      case CmsEnContentType.HTML5_VIDEO:
        setHtmlConfig({
          contentUuid: playInfo.contentUuid,
        });
        break;
      case CmsEnContentType.IMAGE:
        setImageConfig({ contentUuid: playInfo.contentUuid });
        break;
      case CmsEnContentType.ETC:
        setEtcConfig({ contentUuid: playInfo.contentUuid });
        break;
      default:
    }
  }, [playInfo]);

  useEffect(() => {
    if (!curriculum) return;
    setCurriculum(curriculum);
  }, [curriculum]);

  useEffect(() => {
    const learningInfo = routerState.location.state.learningInfo as LearningWindowBaseInfo;
    console.log('state info ', learningInfo);
    if (learningInfo.curriculumId) {
      setBaseInfo(learningInfo);
    }

    setFuncInfo({
      lessonProgress: ContentService.getProgressMulti,
      scormInitialize: ScormRteService.initialize,
      scormCommit: ScormRteService.commit,
      html5LearningHistory: Html5Service.saveHtml5Learning,
      galleryLearningHistory: ImageService.saveImageLearning,
      videoOnProgress: handleVideoProgress,
      videoWatchStatistics: handleVideoWatchStatistics,
      otherClickButton: handleOtherClickButton,
    });
  }, []);

  return <LearnwayLearningWindowLayout />;
}
