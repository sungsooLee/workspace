import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from '@tanstack/react-router';
import { cn } from '@learnway/shared';

import { LearningHeader } from './learning-header/learning-header';
import { LearningContainer } from './learning-container/learning-container';
import styles from '@learnway/styles/fo/pages/_learning/learning-layout.module.css';

import { MobileView, BrowserView } from 'react-device-detect';
import { useLearningWindow } from '../learnway-learning-window.store';

interface LearningLayoutComponentProps {
  children: ReactNode;
}

function LearningLayoutComponent({ children }: LearningLayoutComponentProps) {
  const { playInfo } = useLearningWindow();
  return (
    <>
      <LearningHeader />

      <div className={`${styles.start} ${styles.container}`}>
        <div className={styles.inner}>
          <main>
            <LearningContainer>
              {/* 퍼블수정 20250811 모바일 레슨명 추가 */}
              <MobileView>
                <div className={styles.lesson_box}>
                  <strong>{playInfo?.lessonName}</strong>
                </div>
              </MobileView>
              {children}
            </LearningContainer>
          </main>
        </div>
      </div>
    </>
  );
}

export const LearningLayout = memo(LearningLayoutComponent);
