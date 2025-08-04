import { IcoMoreHorizontal } from '@learnway/icons';
import { cn } from '@learnway/shared';
import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css'; // 결과모듈
import { Button } from '@learnway/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { BrowserView, MobileView } from 'react-device-detect';
import { AuthTitle } from '../../features/auth';
import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';
import styles from './dormant-info.module.css';

export const Route = createFileRoute('/_auth/dormant-info')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.auth_wrap} ${styles.dormant_info}`}>
      <div className={cn(styles.auth_box, 'auth--box')}>
        <AuthTitle />

        <div className={`${proccessResultStyles.start} ${styles.dormant}`}>
          <i className={proccessResultStyles.ico}>
            <IcoMoreHorizontal className={proccessResultStyles.ico3} />
          </i>

          <p className={proccessResultStyles.noti}>
            회원님의 계정은 1년 이상 미사용 되어 휴면 계정으로 전환된 상태입니다.
            <br />
            서비스를 이용하시려면 계정복구 버튼을 누르시기 바랍니다.
          </p>
        </div>

        <BrowserView>
          <div className={cn(styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl">
              취소
            </Button>
            <Button variant="primary" size="xl">
              계정복구
            </Button>
          </div>
        </BrowserView>

        <MobileView>
          <MobileContainerFooter>
            <Button variant="primary" size="xl">
              계정복구
            </Button>
          </MobileContainerFooter>
        </MobileView>
      </div>
    </div>
  );
}
