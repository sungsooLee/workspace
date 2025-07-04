import React, { FC, useEffect, useRef, useState } from 'react';

import styles from '@learnway/styles/fo/pages/_learning/learning.module.css';
import stylesMobile from '@learnway/styles/fo/pages/_learning/learning-m.module.css';

import { useFetchAuthUser } from '@learnway/auth/entities';
import { useIsMobile } from '@learnway/hooks';

import { ScormHandler } from '../service/scorm-handler';

import { useGetScormRteScoInfo } from '@entities/scorm/service/scorm-rte.hook';
import { ScormDataManager, ScormRteClient } from '@features/learning-window';

export interface ScormPlayerConfigProperties {
  /** 과정 차수 ID */
  sequenceId: number;
  /** 과정Id */
  courseId: number;
  /** 커리큘럼Id */
  curriculumId: number;
  /** 콘텐츠 UUID */
  contentUuid: string;
  /** 스콤 콘텐츠 구성(Organization) Id */
  orgnId: number;
  /** Scorm Manifest Item element Id */
  scoId: string;
}

const LearningWindowScormPlayerComponent: FC<any> = ({
  playInfo,
  scormConfig,
}: {
  playInfo: any;
  scormConfig: ScormPlayerConfigProperties;
}) => {
  const isMobile = useIsMobile();
  const [iframeUrl, setIframeUrl] = useState<string>();
  const [queryParam, setQueryParam] = useState<any>();

  const { data: loginUser } = useFetchAuthUser();
  const { data: scormInfo } = useGetScormRteScoInfo(queryParam);
  useEffect(() => {
    if (!scormConfig) return;
    setQueryParam(scormConfig);
  }, [scormConfig]);

  useEffect(() => {
    if (!loginUser) return;
    if (!scormInfo) return;
    console.log(scormInfo);

    let itemUrl = scormInfo.itemURL;

    if ((window as any).__ENV__?.APP_ENV === 'local') {
      const url = new URL(itemUrl);
      itemUrl = url.pathname;
    }
    const scrc = new ScormRteClient(playInfo);
    const dm = new ScormDataManager(scrc.getErrorManager());
    dm.fromJSON(scormInfo);

    (window as any).API_1484_11 = new ScormHandler(scrc, dm);

    setIframeUrl(itemUrl);
    return () => {
      console.log('end Player');
      delete (window as any).API_1484_11;
    };
  }, [loginUser, scormInfo]);

  return (
    <div
      className={
        isMobile
          ? `${stylesMobile.start} ${stylesMobile.iframe}`
          : `${styles.start} ${styles.iframe}`
      }
    >
      <iframe
        //src="http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/public/8807/resources/01/index.html"
        //src="/public/8807/resources/01/index.html"
        //src="/html/hkscorm/index_lms.html"
        // src="/html/lf_new_model/resources/01/index.html"
        src={iframeUrl}
        title="SCORM Content"
        className={isMobile ? stylesMobile.iframe : styles.iframe}
      />
    </div>
  );
};

export const LearningWindowScormPlayer = LearningWindowScormPlayerComponent;
