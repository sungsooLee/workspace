import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { EnContentType, LearningWindowLayout, useLearningWindow } from '@learnway/ui';

import { learningResourceQueryOptions, useFetchBlogContent } from '@entities/learning-resource';
import { ContentType } from '@types';

const PreviewLearningWindowComponent: FC<any> = ({ contentUuid }: { contentUuid: string }) => {
  const { setBlogInfo, setVideoInfo, setPlayInfo, setScormInfo, setFuncInfo } = useLearningWindow();

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );

  useEffect(() => {
    if (!data) return;
    console.log('content data', data);
    switch (data.contentType) {
      case ContentType.SCORM:
        break;
      case ContentType.BLOG:
        setBlogInfo(data);
        break;
      case ContentType.VIDEO:
        setVideoInfo(data);
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
      curriculum: (payload) => {
        console.log('curriculum called', payload);
      },
      videoOnProgress: (payload) => {
        console.log('videoOnProgress called', payload);
      },
    });
  }, [data]);

  return <LearningWindowLayout />;
};

export const PreviewLearningWindow = PreviewLearningWindowComponent;
