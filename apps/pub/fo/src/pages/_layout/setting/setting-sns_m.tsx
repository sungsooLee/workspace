import { createFileRoute } from '@tanstack/react-router';
import { Switch } from '@learnway/ui';

import styles from './setting-sns_m.module.css';

import naver from '@learnway/styles/fo/assets/images/common/logo_sns_naver.png';
import kakao from '@learnway/styles/fo/assets/images/common/logo_sns_kakao.png';
import google from '@learnway/styles/fo/assets/images/common/logo_sns_google.png';

export const Route = createFileRoute('/_layout/setting/setting-sns_m')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.sns_wrap}`}>
      <ul>
        <li>
          <div className={styles.box}>
            <div className={styles.tit}>
              <img src={naver} alt="" />
              <strong>네이버 로그인 연결</strong>
            </div>
            <Switch id="id-1" />
          </div>
        </li>
        <li>
          <div className={styles.box}>
            <div className={styles.tit}>
              <img src={kakao} alt="" />
              <strong>카카오 로그인 연결</strong>
            </div>
            <Switch id="id-2" />
          </div>
        </li>
        <li>
          <div className={styles.box}>
            <div className={styles.tit}>
              <img src={google} alt="" />
              <strong>구글 로그인 연결</strong>
            </div>
            <Switch id="id-3" />
          </div>
        </li>
      </ul>
    </div>
  );
}
