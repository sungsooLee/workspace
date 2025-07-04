import { FC, useEffect } from 'react';

import styles from '@learnway/styles/fo/pages/_learning.module.css';

import { LearningLayout } from './layout/learning-layout';
import { LearningWindow } from './learning-window';

const LearningWindowLayoutComponent: FC<any> = () => {
  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      <LearningLayout>
        <div></div>
        <LearningWindow />
      </LearningLayout>
    </div>
  );
};

export const LearningWindowLayout = LearningWindowLayoutComponent;
