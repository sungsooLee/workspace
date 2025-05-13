import { memo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from '@tanstack/react-router';
import { cn } from '@learnway/shared';

import { LearningHeader } from './learning-header/learning-header';
import { LearningContainer } from './learning-container/learning-container';
import styles from './learning-layout.module.css';

import { MobileView, BrowserView } from 'react-device-detect';

interface LearningLayoutComponentProps {
  children: ReactNode;
}

function LearningLayoutComponent({ children }: LearningLayoutComponentProps) {
  return (
    <>
      <LearningHeader />

      <div className={`${styles.start} ${styles.container}`}>
        <div className={styles.inner}>
          <main>
            <LearningContainer>{children}</LearningContainer>
          </main>
        </div>
      </div>
    </>
  );
}

export const LearningLayout = memo(LearningLayoutComponent);
