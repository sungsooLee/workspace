import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { EnContentType, LearningWindowLayout, useLearningWindow } from '@learnway/ui';

import { learningResourceQueryOptions, useFetchBlogContent } from '@entities/learning-resource';
import { ContentType } from '@types';

const PreviewLearningWindowComponent: FC<any> = ({ contentUuid }: { contentUuid: string }) => {
  const { setBlogInfo, setPlayInfo, setScormInfo } = useLearningWindow();

  const { data, error: fetchError } = useQuery(
    learningResourceQueryOptions.getContent(contentUuid),
  );

  useEffect(() => {
    if (!data) return;
    switch (data.contentType) {
      case ContentType.SCORM:
        break;
      case ContentType.BLOG:
        setBlogInfo(data);
        break;
      case ContentType.VIDEO:
        break;
    }
  }, [data]);

  return <LearningWindowLayout />;
};

export const PreviewLearningWindow = PreviewLearningWindowComponent;
