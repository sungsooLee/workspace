import { FC, useEffect, useRef, useState } from 'react';

import { isMobile } from 'react-device-detect';

import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';
import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import { useLearningWindow } from '../../learnway-learning-window.store';

const styles = isMobile ? stylesMobile : stylesWeb;
const LearningWindowHtmlPlayerComponent: FC<any> = () => {
  const [iframeUrl, setIframeUrl] = useState<string>();

  const { playInfo, htmlInfo, funcInfo } = useLearningWindow();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!htmlInfo) return;
    console.log('html', htmlInfo);

    let itemUrl = htmlInfo.startFileUrl;

    if ((window as any).__ENV__?.APP_ENV === 'local') {
      const url = new URL(itemUrl);
      itemUrl = url.pathname;
    }
    setIframeUrl(itemUrl);
    const timeoutId = setTimeout(() => {
      if (playInfo) {
        const payload = {
          courseSequenceId: playInfo.sequenceId,
          courseId: playInfo.courseId,
          curriculumId: playInfo.curriculumId,
          moduleId: playInfo.moduleId,
          lessonId: playInfo.lessonId,
          contentUuid: playInfo.contentUuid,
          playRate: 100,
        };
        funcInfo?.html5LearningHistory(payload);
      }
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [htmlInfo]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (
        iframeRef.current &&
        iframeRef.current.contentWindow &&
        iframeRef.current.contentWindow.document
      ) {
        const iframeEvent = new KeyboardEvent('keydown', {
          key: event.key,
          code: event.code,
          keyCode: event.keyCode,
          charCode: event.charCode,
          which: event.which,
          shiftKey: event.shiftKey,
          ctrlKey: event.ctrlKey,
          metaKey: event.metaKey,
          altKey: event.altKey,
          bubbles: true,
        });
        iframeRef.current.contentWindow.document.dispatchEvent(iframeEvent);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      <div className={styles.iframe_contents}>
        <iframe src={iframeUrl} title="HTML Content" className={styles.iframe}></iframe>
      </div>
    </div>
  );
};

export const LearningWindowHtmlPlayer = LearningWindowHtmlPlayerComponent;
