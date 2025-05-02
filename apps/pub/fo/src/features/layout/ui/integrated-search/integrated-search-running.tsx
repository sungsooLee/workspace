import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoArrowForward } from '@learnway/icons';

import styles from './integrated-search-running.module.css';

const IntegratedSearchRunningComponent = () => {
  return (
    <div className={`${styles.start} ${styles.running}`}>
      <div className={styles.tit_box}>
        <strong>러닝랩</strong>
        <Link to="">
          러닝랩 더보기
          <IcoArrowForward width={16} height={16} stroke="#131c30" />
        </Link>
      </div>

      <div className={styles.running_box}></div>
    </div>
  );
};

export const IntegratedSearchRunning = IntegratedSearchRunningComponent;
