import { useState } from 'react';
import styles from './integrated-search-channel.module.css';

const IntegratedSearchChannelComponent = () => {
  return (
    <div className={`${styles.start} ${styles.channel}`}>
      <div className={styles.channel_box}></div>
    </div>
  );
};

export const IntegratedSearchChannel = IntegratedSearchChannelComponent;
