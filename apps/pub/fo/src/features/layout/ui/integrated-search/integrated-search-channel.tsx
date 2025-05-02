import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoArrowForward } from '@learnway/icons';

import styles from './integrated-search-channel.module.css';

const IntegratedSearchChannelComponent = () => {
  return (
    <div className={`${styles.start} ${styles.channel}`}>
      <div className={styles.tit_box}>
        <strong>채널</strong>
        <Link to="">
          채널 더보기
          <IcoArrowForward width={16} height={16} stroke="#131c30" />
        </Link>
      </div>

      <div className={styles.channel_box}></div>
    </div>
  );
};

export const IntegratedSearchChannel = IntegratedSearchChannelComponent;
