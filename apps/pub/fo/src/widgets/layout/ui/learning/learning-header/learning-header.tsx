import { memo } from 'react';
import { isMobile } from 'react-device-detect';
import { useLocation } from '@tanstack/react-router';
import { Button } from '@learnway/ui';

import { IcoArrowBackward } from '@learnway/icons';

import { cn } from '@learnway/shared';

import styles from '@learnway/styles/fo/pages/_learning/learning-header/learning-header.module.css';

import logo from '@learnway/styles/fo/assets/images/common/logo_learning.png';

function LearningHeaderComponent() {
  return (
    <div className={`${styles.start} ${styles.learning_header}`}>
      <header className={styles.header_area}>
        {/* 퍼블수정 20250716 : 마크업 수정 */}
        <div className={styles.header_info}>
          <Button className={styles.btn_back}>
            <img src={logo} alt="" />
          </Button>
          <Button className={styles.btn_title}>
            <h1>레슨명</h1>
          </Button>
        </div>
        <div className={styles.header_info}>
          <Button className={styles.btn_learning}>나의 학습</Button>
        </div>
      </header>
    </div>
  );
}

export const LearningHeader = memo(LearningHeaderComponent);
