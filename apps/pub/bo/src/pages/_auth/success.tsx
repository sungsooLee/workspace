import { createFileRoute, Link } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { IcoComplete } from '@learnway/icons';

import styles from '@learnway/styles/bo/pages/_auth/search-account/result.module.css'; // 페이지 모듈

import proccessResultStyles from '@learnway/styles/bo/widgets/auth/ui/proccess-result.module.css'; // 결과모듈
import hightlightMessageBoxStyles from '@learnway/styles/bo/shared/ui/highlight-message-box/highlight-message-box.module.css'; // 블루박스

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

          {/* 아이디 찾기 결과 일때 출력 */}
          <h3 className={proccessResultStyles.title}>가입 신청완료</h3>
          <p className={proccessResultStyles.noti}>
            가입승인은 신청일부터 최대 5일 이내 완료됩니다.
            <br /> 회원가입 시 입력된 메일 주소로 가입승인 메일이 발송됩니다.
          </p>

          {/* 관리자 권한 신청완료 시 */}
          <h3 className={proccessResultStyles.title}>관리자 권한 신청완료</h3>
          <p className={proccessResultStyles.noti}>
            관리자 승인 완료 후 승인 결과가
            <br />
            인증 받은 메일로 발송됩니다.
          </p>

          <div className={styles.btn_txt}>
            <Link to="">진행현황 확인</Link>
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
