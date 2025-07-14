import React, { FC, useEffect, useState } from 'react';

import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

const styles = isMobile ? stylesMobile : stylesWeb;
const LearningWindowHtmlPlayerComponent: FC<any> = ({
  playInfo,
  htmlInfo,
}: {
  playInfo: any;
  htmlInfo: any;
}) => {
  const [iframeUrl, setIframeUrl] = useState<string>();

  useEffect(() => {
    if (!htmlInfo) return;
    console.log('html', htmlInfo);

    let itemUrl = htmlInfo.startFileUrl;

    if ((window as any).__ENV__?.APP_ENV === 'local') {
      const url = new URL(itemUrl);
      itemUrl = url.pathname;
    }
    setIframeUrl(itemUrl);
  }, [htmlInfo]);

  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      <iframe src={iframeUrl} title="HTML Content" className={styles.iframe} />
    </div>
  );
};

export const LearningWindowHtmlPlayer = LearningWindowHtmlPlayerComponent;
