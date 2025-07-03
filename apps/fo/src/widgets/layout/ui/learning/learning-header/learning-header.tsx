import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from '@tanstack/react-router';
import { Button } from '@learnway/ui';

import { IcoArrowBackward } from '@learnway/icons';

import { cn } from '@learnway/shared';

import styles from './learning-header.module.css';

function LearningHeaderComponent() {
  return (
    <div className={`${styles.start} ${styles.learning_header}`}>
      <header className={styles.header_area}>
        <Button className={styles.btn_back}>
          <IcoArrowBackward
            width={isMobile ? 24 : 40}
            height={isMobile ? 24 : 40}
            stroke={isMobile ? '#000' : '#fff'}
          ></IcoArrowBackward>
        </Button>
        <h1>레슨명</h1>
      </header>
    </div>
  );
}

export const LearningHeader = memo(LearningHeaderComponent);
