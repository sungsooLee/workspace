import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import styles from './success.module.css';
import authBottomBtnStyles from './authBottomBtn.module.css';
import { IcoComplete } from '@learnway/icons';

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
          <h3 className={styles.title}>가입 신청완료</h3>
          <p className={styles.noti}>
            가입승인은 신청일부터 최대 5일 이내 완료됩니다.
            <br /> 회원가입 시 입력된 메일 주소로 가입승인 메일이 발송됩니다.
          </p>
          <div className={styles.btn_txt}>
            <Link to="/progress-status">진행현황 확인</Link>
          </div>
        </div>

        <div className={`${authBottomBtnStyles.btn_wrap} ${styles.btn_wrap}`}>
          <Button variant="primary" size="xl" className={authBottomBtnStyles.max}>
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
