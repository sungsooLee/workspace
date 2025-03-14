import { isMobile } from 'react-device-detect';
import { cn } from '@learnway/shared';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button } from '@learnway/ui';

import styles from './agreement.module.css'; // 페이지 모듈

import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css';

export const Route = createFileRoute('/_auth/agreement')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.agreement}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <div className={`${proccessResultStyles.start} ${styles.title_info}`}>
          <h3 className={proccessResultStyles.title}>Learningway 이용약관 및 개인정보 처리방침 </h3>
          <p className={proccessResultStyles.noti}>
            이용약관 및 개인정보 처리방침에 동의하셔야 러닝웨이 서비스를 이용할 수 있습니다.
          </p>
        </div>

        <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl">
            취소
          </Button>
          <Button variant="primary" size="xl">
            동의
          </Button>
        </div>
      </div>
    </div>
  );
}
