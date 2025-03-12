import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import styles from '@learnway/styles/fo/pages/_auth/search-account/result.module.css';
import { IcoComplete } from '@learnway/icons';
import googleOtpGuideButtonStyles from '@learnway/styles/fo/features/auth/ui/google-otp-guide/google-otp-guide-button.module.css';

export const Route = createFileRoute('/_auth/success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.success}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={styles.success_info}>
          <i className={styles.ico}>
            {/* 정상처리 */}
            <IcoComplete className={styles.ico1} />
          </i>

          {/* 퍼블수정 20250312 : 휴먼 해제와 동일포맷 */}
          {/* 아이디 찾기 결과 일때 출력 */}
          <h3 className={styles.title}>가입 신청완료</h3>
          <p className={styles.noti}>
            가입승인은 신청일부터 최대 5일 이내 완료됩니다.
            <br /> 회원가입 시 입력된 메일 주소로 가입승인 메일이 발송됩니다.
          </p>

          <div className={styles.btn_txt}>
            <Link to="/progress-status">진행현황 확인</Link>
          </div>
          {/* 아이디 찾기 결과 일때 출력 */}

          {/* 휴면 해제 일때 출력 */}
          <h3 className={styles.title}>휴먼 해제 되었습니다.</h3>
          <p className={styles.noti}>
            휴면 상태가 해제 되면 별도로 보관되던 개인정보도 함께 복구되어
            <br /> 정상적인 서비스를 사용할수 있습니다
          </p>

          <div className={styles.noti_box}>
            마지막 변경일 : <strong>2025-01-01(목) 12:50:52</strong>
          </div>

          {/* 휴면 해제 일때 출력 */}
        </div>

        <div
          className={`${googleOtpGuideButtonStyles.start} ${googleOtpGuideButtonStyles.btn_wrap} ${styles.btn_wrap}`}>
          <Button variant="primary" size="xl" className={googleOtpGuideButtonStyles.max}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
