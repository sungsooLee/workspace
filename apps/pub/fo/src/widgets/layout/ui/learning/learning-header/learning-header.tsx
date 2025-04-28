import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import styles from './learning-header.module.css';

function LearningHeaderComponent() {
  return (
    <div className={`${styles.start} ${styles.learning_header}`}>
      <header className={styles.header_area}>타이틀</header>
    </div>
  );
}

export const LearningHeader = memo(LearningHeaderComponent);
