import React, { FC, useEffect, useState } from 'react';

import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import { useLearningWindow } from '@learnway/ui';

const styles = isMobile ? stylesMobile : stylesWeb;
const LearningWindowHtmlPlayerComponent: FC<any> = () => {
  const [iframeUrl, setIframeUrl] = useState<string>();
  const { playInfo, htmlInfo, funcInfo } = useLearningWindow();
  useEffect(() => {
    if (!htmlInfo) return;
    console.log('html', htmlInfo);

    let itemUrl = htmlInfo.startFileUrl;

    if ((window as any).__ENV__?.APP_ENV === 'local') {
      const url = new URL(itemUrl);
      itemUrl = url.pathname;
    }
    setIframeUrl(itemUrl);

    setTimeout(() => {
      const payload = {
        courseSequenceId: playInfo?.sequenceId,
        courseId: playInfo?.courseId,
        curriculumId: playInfo?.curriculumId,
        moduleId: playInfo?.moduleId,
        lessonId: playInfo?.lessonId,
        contentUuid: playInfo?.contentUuid,
        playRate: 100,
      };
      funcInfo?.html5LearningHistory(payload);
    }, 5000);
  }, [htmlInfo]);

  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      <div className={styles.iframe_contents}>
        <iframe src={iframeUrl} title="HTML Content" className={styles.iframe} />
      </div>
    </div>
  );
};

export const LearningWindowHtmlPlayer = LearningWindowHtmlPlayerComponent;
