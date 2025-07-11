import { memo } from 'react';
import { useRouter, useCanGoBack } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';

import { IcoArrowBackward } from '@learnway/icons';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/pages/_learning/learning-header/learning-header.module.css';

import { useLearningWindow } from '../../learnway-learning-window.store';
import { Button } from '../../../button/button';

function LearningHeaderComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { playInfo } = useLearningWindow();
  const handleBackButtonClick = () => {
    if (canGoBack) router.history.back();
  };
  return (
    <div className={`${styles.start} ${styles.learning_header}`}>
      <header className={styles.header_area}>
        <Button className={styles.btn_back} onClick={handleBackButtonClick}>
          <IcoArrowBackward
            width={isMobile ? 24 : 40}
            height={isMobile ? 24 : 40}
            stroke={isMobile ? '#000' : '#fff'}
          ></IcoArrowBackward>
        </Button>
        <h1>{playInfo?.lessonName}</h1>
      </header>
    </div>
  );
}

export const LearningHeader = memo(LearningHeaderComponent);
