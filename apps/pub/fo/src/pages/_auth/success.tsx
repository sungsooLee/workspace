import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import styles from './success.module.css';
import authStyles from './auth.module.css';
import { IcoCheck02 } from '@learnway/icons';

export const Route = createFileRoute('/_auth/success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap}`}>
      <div className={authStyles.auth_box}>
        <div className={styles.success_info}>
          <i className={styles.ico}>
            <IcoCheck02 width={32} height={24} stroke="#ffffff" />
          </i>
          <h3 className={styles.title}>가입 신청완료</h3>
          <p className={styles.noti}>
            가입승인은 신청일부터 최대 5일 이내 완료됩니다.
            <br /> 회원가입 시 입력된 메일 주소로 가입승인 메일이 발송됩니다.{' '}
          </p>
        </div>
        <div className={authStyles.btn_wrap}>
          <Button variant="gray" size="xl">
            진행현황 확인
          </Button>
          <Button variant="primary" size="xl">
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
