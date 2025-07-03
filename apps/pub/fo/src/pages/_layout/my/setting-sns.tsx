import { createFileRoute } from '@tanstack/react-router';
import { Switch } from '@learnway/ui';
import { IcoSucess02 } from '@learnway/icons';

import styles from './setting-sns.module.css';

import naver from '@learnway/styles/fo/assets/images/common/logo_sns_naver.png';
import kakao from '@learnway/styles/fo/assets/images/common/logo_sns_kakao.png';
import google from '@learnway/styles/fo/assets/images/common/logo_sns_google.png';

import myPageContainerStyles from '@learnway/styles/fo/widgets/layout/ui/main/container/my-page-container.module.css';

export const Route = createFileRoute('/_layout/my/setting-sns')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={myPageContainerStyles.start}>
      <h2>SNS 로그인 설정</h2>
      <div className={`${styles.start} ${styles.sns_wrap}`}>
        <div className={styles.box}>
          <div className={styles.confirm}>
            <IcoSucess02 width={32} height={32} stroke="#a9afb8"></IcoSucess02>
            <p>
              자주 사용하시는 계정과 연결 설정하시면,
              <br />
              간편하게 로그인을 하실 수 있습니다.
            </p>
          </div>

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
      </div>
    </div>
  );
}
