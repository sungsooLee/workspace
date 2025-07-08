import { LearningWindowLayout, useLearningWindow } from '@learnway/ui';
import { FC, useEffect } from 'react';

const PreviewLearningWindowComponent: FC<any> = ({ contentUuid }) => {
  const {} = useLearningWindow();

  useEffect(() => {
    if (!contentUuid) return;
  }, []);

  return <LearningWindowLayout />;
};

export const PreviewLearningWindow = PreviewLearningWindowComponent;
