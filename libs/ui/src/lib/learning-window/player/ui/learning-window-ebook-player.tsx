import React, { FC, useEffect, useRef, useState } from 'react';

import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import { ScormHandler } from '../service/scorm-handler';
import { ScormDataManager } from '../service/scorm-data-manager';
import { ScormRteClient } from '../service/scorm-rte-client';
import { useLearningWindow } from '../../learnway-learning-window.store';

const styles = isMobile ? stylesMobile : stylesWeb;

/**
 * Ebook 컨텐츠는 스콤 형태에 추가 기능이 들어 있어 스콤에서 분리 되어 따로 만듬
 * @returns
 */
const LearningWindowEbookPlayerComponent: FC<any> = () => {
  const [iframeUrl, setIframeUrl] = useState<string>();
  const { playInfo, ebookInfo, funcInfo } = useLearningWindow();

  useEffect(() => {
    if (!ebookInfo) return;
    if (!funcInfo) return;

    console.log('ebookInfo', ebookInfo);

    let itemUrl = ebookInfo.itemURL || ebookInfo.startFileUrl;

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
    dm.fromJSON(ebookInfo);

    (window as any).API_1484_11 = new ScormHandler(scrc, dm);

    setIframeUrl(itemUrl);
    return () => {
      console.log('end Player');
      delete (window as any).API_1484_11;
    };
  }, [funcInfo, ebookInfo]);

  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      <iframe src={iframeUrl} title="EBOOK Content" className={styles.iframe} />
    </div>
  );
};

export const LearningWindowEbookPlayer = LearningWindowEbookPlayerComponent;
