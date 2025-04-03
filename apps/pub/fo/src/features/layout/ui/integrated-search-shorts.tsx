import { useState } from 'react';
import styles from './integrated-search-shorts.module.css';

const IntegratedSearchShortsComponent = () => {
  return (
    <div className={`${styles.start} ${styles.shorts}`}>
      <div className={styles.shorts_box}></div>
    </div>
  );
};

export const IntegratedSearchShorts = IntegratedSearchShortsComponent;
