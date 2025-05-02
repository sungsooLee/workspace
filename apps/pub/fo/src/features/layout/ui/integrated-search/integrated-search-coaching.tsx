import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoArrowForward } from '@learnway/icons';

import styles from './integrated-search-coaching.module.css';

const IntegratedSearchCoachingComponent = () => {
  return (
    <div className={`${styles.start} ${styles.coaching}`}>
      <div className={styles.tit_box}>
        <strong>코칭</strong>
        <Link to="">
          코칭 더보기
          <IcoArrowForward width={16} height={16} stroke="#131c30" />
        </Link>
      </div>

      <div className={styles.coaching_box}></div>
    </div>
  );
};

export const IntegratedSearchCoaching = IntegratedSearchCoachingComponent;
