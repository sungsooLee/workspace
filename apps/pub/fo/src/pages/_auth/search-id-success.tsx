import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import styles from './search-id-success.module.css';
import authBottomBtnStyles from './authBottomBtn.module.css';
import { IcoCaution02, IcoComplete } from '@learnway/icons';

export const Route = createFileRoute('/_auth/search-id-success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_auth}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={styles.success_info}>
          <i className={styles.ico}>
            {/* 정상처리 */}
            <IcoComplete className={styles.ico1} />
            {/* 확인불가 
            <IcoCaution02 className={styles.ico2} />
            */}
          </i>
          <h3 className={styles.title}>
            {/* 정상처리 */}
            입력하신 정보로 가입된 아이디는
            <br />
            아래와 같습니다.
            {/* 확인불가 */}
            {/*입력하신 정보로 가입된 아이디를
            <br />
            찾을 수 없습니다.*/}
          </h3>
          <div className={styles.noti_box}>hyundai.kim@hyundai.com</div>
          <div className={styles.btn_txt}>
            <Link to="/progress-status">비밀번호 찾기</Link>
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
