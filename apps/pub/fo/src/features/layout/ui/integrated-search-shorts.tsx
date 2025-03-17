import { useState } from 'react';
import styles from '@learnway/styles/fo/features/integrated-search/integrated-search-shorts.module.css';

const IntegratedSearchShortsComponent = () => {
  return (
    <div className={`${styles.start} ${styles.shorts}`}>
      <div className={styles.shorts_box}></div>
    </div>
  );
};

export const IntegratedSearchShorts = IntegratedSearchShortsComponent;
