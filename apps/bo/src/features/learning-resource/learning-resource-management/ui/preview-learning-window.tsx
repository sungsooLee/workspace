import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { LearnwayLearningWindowLayout, useLearningWindow } from '@learnway/ui';

import { learningResourceQueryOptions, useFetchBlogContent } from '@entities/learning-resource';
import { ContentType } from '@types';

/**
 *
 * @param scoId : 스콤 item 미리 보기 시 같이 전달 할 것
 * @returns
 */
const PreviewLearningWindowComponent: FC<any> = ({
  contentUuid,
  scoId,
}: {
  contentUuid: string;
  scoId?: string;
}) => {
  const {
    playList,
    playInfo,
    curriculum,
    setBlogInfo,
    setVideoInfo,
    setHtmlInfo,
    setPlayInfo,
    setScormInfo,
    setFuncInfo,
    setCurriculum,
    clearInfo,
  } = useLearningWindow();

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );
  const getScormItemByScoId = (scoId: string) => {
    let retval: any;
    data?.children.forEach((mod: any, index: number) => {
      if (retval) return;
      mod.items.forEach((item: any, index: number) => {
        if (retval) return;
        if (item.scoId === scoId) {
          console.log('322323232', item);
          retval = item;
        }
      });
    });
    return retval;
  };
  const genCuliculumInfo = (data: any): any => {
    const moduleList: any[] = [];
    let lessonIndex = 1;
    data.children.forEach((mod: any, index: number) => {
      const module: any = { moduleId: index + 1, moduleName: mod.orgnTitle };
      moduleList.push(module);
      const lessonList: any[] = [];
      mod.items.forEach((item: any, index: number) => {
        lessonIndex++;
        lessonList.push({
          lessonId: lessonIndex,
          lessonName: item.itemTitle,
          contentUuid: data.channelUuid,
          orgnId: mod.orgnId,
          itemId: item.itemId,
          scoId: item.scoId,
          contentType: 'SCORM',
        });
        module.lessonList = lessonList;
      });
    });
    const retval = { moduleList };

    return retval;
  };

  useEffect(() => {
    if (!playInfo) return;
    console.log('playInfo ', playInfo);
    if (playInfo.scoId) {
      const info = getScormItemByScoId(playInfo.scoId);
      setScormInfo({ ...info, itemURL: info.itemUrl });
    }
  }, [playInfo]);

  useEffect(() => {
    if (!curriculum) return;
    if (!playList) return;
    if (scoId) {
      const info = getScormItemByScoId(scoId);
      setScormInfo({ ...info, itemURL: info.itemUrl });
    } else {
      if (playList.length > 0) {
        const first = playList[0];
        setPlayInfo(first.moduleId, first.lessonId);
      }
    }
  }, [curriculum, playList]);

  useEffect(() => {
    if (!data) return;
    console.log('content data', data);
    switch (data.contentType) {
      case ContentType.SCORM:
        setCurriculum(genCuliculumInfo(data));
        break;

      case ContentType.BLOG:
        setBlogInfo(data);
        break;
      case ContentType.VIDEO:
        setVideoInfo(data);
        break;
      case ContentType.HTML5_VIDEO:
        setHtmlInfo(data.resource);
        break;
    }
    setFuncInfo({
      scormInitialize: async (payload) => {
        console.log('scormInitialize called ', payload);
        return 'true';
      },
      scormCommit: async (payload) => {
        console.log('scormCommit called', payload);
        return 'true';
      },
      lessonProgress: (payload) => {
        console.log('lessonProgress called', payload);
      },
      videoOnProgress: (payload) => {
        console.log('videoOnProgress called', payload);
      },
    });
  }, [data]);

  useEffect(() => {
    clearInfo();
  }, []);

  return <LearnwayLearningWindowLayout />;
};

export const PreviewLearningWindow = PreviewLearningWindowComponent;
