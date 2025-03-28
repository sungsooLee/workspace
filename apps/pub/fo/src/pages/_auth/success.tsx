import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { IcoComplete } from '@learnway/icons';
import googleOtpGuideButtonStyles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide-button.module.css';

import styles from '@learnway/styles/fo/pages/_auth/search-account/result.module.css'; // 페이지 모듈

import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css'; // 결과모듈
import hightlightMessageBoxStyles from '@learnway/styles/fo/shared/ui/highlight-message-box/highlight-message-box.module.css'; // 블루박스

import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';

export const Route = createFileRoute('/_auth/success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.success}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        {/* 결과모듈 */}
        <div className={`${proccessResultStyles.start} ${styles.success_info}`}>
          <i className={proccessResultStyles.ico}>
            {/* 정상처리 */}
            <IcoComplete className={proccessResultStyles.ico1} />
          </i>

          {/* 퍼블수정 20250312 : 휴먼 해제와 동일포맷 */}
          {/* 아이디 찾기 결과 일때 출력 */}
          <h3 className={proccessResultStyles.title}>가입 신청완료</h3>
          <p className={proccessResultStyles.noti}>
            가입승인은 신청일부터 최대 5일 이내 완료됩니다.
            <br /> 회원가입 시 입력된 메일 주소로 가입승인 메일이 발송됩니다.
          </p>

          <div className={styles.btn_txt}>
            <Link to="">진행현황 확인</Link>
          </div>
          {/* 아이디 찾기 결과 일때 출력 */}

          {/* 휴면 해제 일때 출력 */}
          <h3 className={proccessResultStyles.title}>휴먼 해제 되었습니다.</h3>
          <p className={proccessResultStyles.noti}>
            휴면 상태가 해제 되면 별도로 보관되던 개인정보도 함께 복구되어
            <br /> 정상적인 서비스를 사용할수 있습니다
          </p>

          <div className={`${hightlightMessageBoxStyles.start} ${styles.noti_box}`}>
            <div>
              휴면 해제일 : <strong>YYYY-MM-DD</strong>
              <br />
              휴면 해제 방법 : <strong>휴대폰 / 이메일 본인인증</strong>
            </div>
          </div>

          {/* 휴면 해제 일때 출력 */}
        </div>
        {/* 결과모듈 */}

        {/* 퍼블수정 20250324 : 버튼 모바일 분기처리 */}
        <BrowserView>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="primary" size="xl">
              로그인
            </Button>
          </div>
        </BrowserView>

        <MobileView>
          <MobileContainerFooter>
            <Button variant="primary" size="xl">
              로그인
            </Button>
          </MobileContainerFooter>
        </MobileView>
      </div>
    </div>
  );
}
