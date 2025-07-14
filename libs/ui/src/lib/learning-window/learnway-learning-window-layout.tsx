import { FC, useEffect } from 'react';

import styles from '@learnway/styles/fo/pages/_learning.module.css';

import { LearningLayout } from './layout/learning-layout';
import { LearningWindow } from './learnway-learning-window';
import { useLearningWindow } from './learnway-learning-window.store';

const LearnwayLearningWindowLayoutComponent: FC<any> = () => {
  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      <LearningLayout>
        <LearningWindow />
      </LearningLayout>
    </div>
  );
};

export const LearnwayLearningWindowLayout = LearnwayLearningWindowLayoutComponent;
