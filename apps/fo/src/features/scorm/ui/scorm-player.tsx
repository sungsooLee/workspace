import React, { FC, useEffect, useRef, useState } from 'react';

import styles from './iframe.module.css';

import { ScormAdapter } from '../service/scorm-adapter';

const win: any = window;
win.API_1484_11 = new ScormAdapter();

const ScormPlayerComponent: FC<any> = ({ contentUuid, iframeHeight = 900, iframeWidth = 1300 }) => {
  const [iframeUrl, setIframeUrl] = useState<string>();

  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      {/* IFrame */}
      <iframe
        //src="http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/public/8807/resources/01/index.html"
        //src="/public/8807/resources/01/index.html"
        //src="/html/hkscorm/index_lms.html"
        // src="/html/lf_new_model/resources/01/index.html"
        src="iframeUrl"
        title="SCORM Content"
        className={styles.iframe}
      />
    </div>
  );
};

export const ScormPlayer = ScormPlayerComponent;
