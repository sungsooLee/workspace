import { useState } from 'react';
import styles from '@learnway/styles/fo/features/integrated-search/integrated-search-coaching.module.css';

const IntegratedSearchCoachingComponent = () => {
  return (
    <div className={`${styles.start} ${styles.coaching}`}>
      <div className={styles.coaching_box}></div>
    </div>
  );
};

export const IntegratedSearchCoaching = IntegratedSearchCoachingComponent;
