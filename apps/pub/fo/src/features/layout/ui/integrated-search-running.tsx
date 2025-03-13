import { useState } from 'react';
import styles from '@learnway/styles/fo/features/integrated-search/integrated-search-running.module.css';

const IntegratedSearchRunningComponent = () => {
  return (
    <div className={`${styles.start} ${styles.running}`}>
      <div className={styles.tit_box}>
        <strong>러닝랩</strong>
      </div>
      <div className={styles.running_box}></div>
    </div>
  );
};

export const IntegratedSearchRunning = IntegratedSearchRunningComponent;
