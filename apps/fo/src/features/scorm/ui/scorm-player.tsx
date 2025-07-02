import React, { FC, useEffect, useRef, useState } from 'react';

import styles from './iframe.module.css';

import { ScormAdapter } from '../service/scorm-adapter';

import { useGetContentDetail } from '@entities/content/service/content.hook';
import { useFetchAuthUser } from '@learnway/auth/entities';

export interface ScormPlayerConfigProperties {
  /** 과정 차수 ID */
  sequenceId: number;
  /** 과정Id */
  courceId: number;
  /** 커리큘럼Id */
  curriculumId: number;
  /** 콘텐츠 UUID */
  contentUuid: string;
  /** 스콤 콘텐츠 구성(Organization) Id */
  orgnId: number;
  /** Scorm Manifest Item element Id */
  scoId: string;
  itemUrl: string;
}

const ScormPlayerComponent: FC<any> = ({
  scormConfig,
}: {
  scormConfig: ScormPlayerConfigProperties;
}) => {
  const { data: loginUser } = useFetchAuthUser();
  const [iframeUrl, setIframeUrl] = useState<string>();

  console.log('scormConfig', scormConfig, loginUser);

  useEffect(() => {
    if (!loginUser) return;
    const win: any = window;
    win.API_1484_11 = new ScormAdapter((loginUser as any).accessToken, scormConfig);
    return () => {
      const win: any = window;
      delete win.API_1484_11;
    };
  }, [loginUser]);

  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      {/* IFrame */}
      <iframe
        //src="http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/public/8807/resources/01/index.html"
        //src="/public/8807/resources/01/index.html"
        //src="/html/hkscorm/index_lms.html"
        // src="/html/lf_new_model/resources/01/index.html"
        src={scormConfig?.itemUrl}
        title="SCORM Content"
        className={styles.iframe}
      />
    </div>
  );
};

export const ScormPlayer = ScormPlayerComponent;
