import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { IcoCaution02, IcoComplete } from '@learnway/icons';

import styles from '@learnway/styles/fo/pages/_auth/search-account/result.module.css'; // 페이지 모듈

import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css'; // 결과모듈
import hightlightMessageBoxStyles from '@learnway/styles/fo/shared/ui/highlight-message-box/highlight-message-box.module.css'; // 블루박스

export const Route = createFileRoute('/_auth/search-id-success')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.search_auth}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        {/* 결과모듈 */}
        <div className={`${proccessResultStyles.start} ${styles.success_info}`}>
          <i className={proccessResultStyles.ico}>
            {/* 정상처리 */}
            <IcoComplete className={proccessResultStyles.ico1} />
            {/* 확인불가 */}
            {/* <IcoCaution02 className={proccessResultStyles.ico2} /> */}
          </i>
          <h3 className={proccessResultStyles.title}>
            {/* 정상처리 */}
            입력하신 정보로 가입된 아이디는
            <br />
            아래와 같습니다.
            {/* 확인불가 */}
            {/*입력하신 정보로 가입된 아이디를
            <br />
            찾을 수 없습니다.*/}
          </h3>

          <div className={`${hightlightMessageBoxStyles.start} ${styles.noti_box}`}>
            <div className={styles.result_message}>hyundai.kim@hyundai.com</div>
          </div>

          <div className={styles.btn_txt}>
            <Link to="">비밀번호 찾기</Link>
          </div>
        </div>
        {/* 결과모듈 */}

        <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="primary" size="xl">
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}
