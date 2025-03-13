import { useState } from 'react';
import styles from '@learnway/styles/fo/features/integrated-search/integrated-search-channel.module.css';

const IntegratedSearchChannelComponent = () => {
  return (
    <div className={`${styles.start} ${styles.channel}`}>
      <div className={styles.tit_box}>
        <strong>채널</strong>
      </div>
      <div className={styles.channel_box}></div>
    </div>
  );
};

export const IntegratedSearchChannel = IntegratedSearchChannelComponent;
