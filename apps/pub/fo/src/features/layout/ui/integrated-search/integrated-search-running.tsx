import { useState } from 'react';
import styles from './integrated-search-running.module.css';

const IntegratedSearchRunningComponent = () => {
  return (
    <div className={`${styles.start} ${styles.running}`}>
      <div className={styles.running_box}></div>
    </div>
  );
};

export const IntegratedSearchRunning = IntegratedSearchRunningComponent;
