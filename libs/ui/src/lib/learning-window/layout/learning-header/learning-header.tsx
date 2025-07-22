import { memo } from 'react';
import { useRouter, useCanGoBack } from '@tanstack/react-router';
import { isMobile } from 'react-device-detect';

import { IcoArrowBackward } from '@learnway/icons';
import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/pages/_learning/learning-header/learning-header.module.css';
import logo from '@learnway/styles/fo/assets/images/common/logo_learning.png';

import { useLearningWindow } from '../../learnway-learning-window.store';
import { Button } from '../../../button/button';

function LearningHeaderComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { baseInfo, playInfo } = useLearningWindow();
  const handleBackButtonClick = () => {
    if (canGoBack) router.history.back();
  };
  return (
    <div className={`${styles.start} ${styles.learning_header}`}>
      <header className={styles.header_area}>
        {/* 퍼블수정 20250716 : 마크업 수정 */}
        {isMobile ? (
          <>
            <Button>
              <IcoArrowBackward width={24} height={24} stroke="#131416" />
            </Button>
            <h1>{playInfo?.lessonName}</h1>
          </>
        ) : (
          <>
            <div className={styles.header_info}>
              <Button className={styles.btn_back}>
                <img src={logo} alt="" />
              </Button>
              <Button className={styles.btn_title}>
                <h1>{playInfo?.lessonName}</h1>
              </Button>
            </div>
            <div className={styles.header_info}>
              <Button className={styles.btn_learning}>나의 학습</Button>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export const LearningHeader = memo(LearningHeaderComponent);
