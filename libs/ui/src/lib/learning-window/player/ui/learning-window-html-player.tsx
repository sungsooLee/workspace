import React, { FC, useEffect, useRef, useState } from 'react';

import { isMobile } from 'react-device-detect';

import stylesWeb from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import { ScormHandler } from '../service/scorm-handler';
import { ScormDataManager } from '../service/scorm-data-manager';
import { ScormRteClient } from '../service/scorm-rte-client';

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
    console.log('--------------------', itemUrl);
    // const scrc = new ScormRteClient(playInfo, scormRteService);
    // const dm = new ScormDataManager(scrc.getErrorManager());
    // dm.fromJSON(htmlInfo);

    //(window as any).API_1484_11 = new ScormHandler(scrc, dm);

    setIframeUrl(itemUrl);
    // return () => {
    //   console.log('end Player');
    //   delete (window as any).API_1484_11;
    // };
  }, [htmlInfo]);

  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      <iframe
        //src="http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/public/8807/resources/01/index.html"
        //src="/public/8807/resources/01/index.html"
        //src="/html/hkscorm/index_lms.html"
        // src="/html/lf_new_model/resources/01/index.html"
        src={iframeUrl}
        title="HTML Content"
        className={styles.iframe}
      />
    </div>
  );
};

export const LearningWindowHtmlPlayer = LearningWindowHtmlPlayerComponent;
