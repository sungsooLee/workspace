import React, { FC, useEffect, useRef, useState } from 'react';

import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import { ScormHandler } from '../service/scorm-handler';
import { ScormDataManager } from '../service/scorm-data-manager';
import { ScormRteClient } from '../service/scorm-rte-client';
import { useLearningWindow } from '../../learnway-learning-window.store';

const styles = isMobile ? stylesMobile : stylesWeb;

const LearningWindowScormPlayerComponent: FC<any> = () => {
  const [iframeUrl, setIframeUrl] = useState<string>();
  const { playInfo, scormInfo, funcInfo } = useLearningWindow();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (!scormInfo) return;
    if (!funcInfo) return;

    console.log('scormInfo - ', scormInfo);

    let itemUrl = scormInfo.itemURL;

    if ((window as any).__ENV__?.APP_ENV === 'local') {
      const url = new URL(itemUrl);
      itemUrl = url.pathname;
    }
    const scormRteService: any = {
      initialize: funcInfo.scormInitialize,
      commit: funcInfo.scormCommit,
    };

    const scrc = new ScormRteClient(playInfo, scormRteService);
    const dm = new ScormDataManager(scrc.getErrorManager());
    dm.fromJSON(scormInfo);

    (window as any).API_1484_11 = new ScormHandler(scrc, dm);

    setIframeUrl(itemUrl);
    return () => {
      console.log('end Player');
      delete (window as any).API_1484_11;
    };
  }, [funcInfo, scormInfo]);

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
        <iframe ref={iframeRef} src={iframeUrl} title="SCORM Content" className={styles.iframe} />
      </div>
    </div>
  );
};

export const LearningWindowScormPlayer = LearningWindowScormPlayerComponent;
