import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import styles from './success.module.css';
import signupStyles from './signup.module.css';
import { IcoCheck02 } from '@learnway/icons';

export const Route = createFileRoute('/_auth/success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${signupStyles.auth_wrap}`}>
      <div className={`${signupStyles.auth_box} ${signupStyles.success}`}>
        <div className={styles.success_info}>
          <i className={styles.ico}>
            <IcoCheck02 width={32} height={24} />
          </i>
          <h3 className={styles.title}>가입 신청완료</h3>
          <p className={styles.noti}>
            가입승인은 신청일부터 최대 5일 이내 완료됩니다.
            <br /> 회원가입 시 입력된 메일 주소로 가입승인 메일이 발송됩니다.
          </p>
          <div className={styles.btn_txt}>
            <Link to="">진행현황 확인</Link>
          </div>
        </div>

        <div className={signupStyles.btn_wrap}>
          <Button variant="primary" size="xl">
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
