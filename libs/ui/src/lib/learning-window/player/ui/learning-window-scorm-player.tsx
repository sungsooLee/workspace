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

  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      <iframe
        //src="http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/public/8807/resources/01/index.html"
        //src="/public/8807/resources/01/index.html"
        //src="/html/hkscorm/index_lms.html"
        // src="/html/lf_new_model/resources/01/index.html"
        src={iframeUrl}
        title="SCORM Content"
        className={styles.iframe}
      />
    </div>
  );
};

export const LearningWindowScormPlayer = LearningWindowScormPlayerComponent;
