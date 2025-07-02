import React, { FC, useEffect, useRef, useState } from 'react';

import styles from './iframe.module.css';

import { useFetchAuthUser } from '@learnway/auth/entities';

import { ScormHandler } from '../service/scorm-handler';

import { useGetScormRteScoUrl } from '@entities/scorm/service/scorm-rte.hook';

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

  itemURL: string;
}

const ScormPlayerComponent: FC<any> = ({
  scormConfig,
}: {
  scormConfig: ScormPlayerConfigProperties;
}) => {
  const [iframeUrl, setIframeUrl] = useState<string>();
  const [queryParam, setQueryParam] = useState<any>();

  const { data: loginUser } = useFetchAuthUser();

  useEffect(() => {
    if (!loginUser) return;
    if (!scormConfig) return;
    const param = {
      ...scormConfig,
    };

    setQueryParam(param);

    const win: any = window;

    let itemUrl = scormConfig.itemURL;

    if (win.__ENV__?.APP_ENV === 'local') {
      const url = new URL(itemUrl);
      itemUrl = url.pathname;
    }
    win.API_1484_11 = new ScormHandler((loginUser as any).accessToken, scormConfig);

    setIframeUrl(itemUrl);
    return () => {
      console.log('end Player');
      const win: any = window;
      delete win.API_1484_11;
    };
  }, [loginUser, scormConfig]);

  return (
    <div className={`${styles.start} ${styles.iframe}`}>
      {/* IFrame */}
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

export const ScormPlayer = ScormPlayerComponent;
