import { createFileRoute } from '@tanstack/react-router';
import { MobileView, BrowserView } from 'react-device-detect';
import { AuthTitle } from '../../features/auth';
import { useState } from 'react';
import { cn } from '@learnway/shared';
import { IcoProgress } from '@learnway/icons';
import styles from './tenant-select.module.css';
import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css'; // 결과모듈
import { MobileContainerFooter } from '../../shared/m.ui/container-footer/container-footer';
import { Button } from '@learnway/ui';

export const Route = createFileRoute('/_auth/dormant-info')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={cn(styles.auth_box, 'auth--box')}>
      <AuthTitle />
      {/* 결과모듈 */}
      <div className={`${proccessResultStyles.start} ${styles.success_info}`}>
        <i className={proccessResultStyles.ico}>
          <IcoProgress className={proccessResultStyles.ico1} />
        </i>

        <p className={proccessResultStyles.noti}>
          가입승인은 신청일부터 최대 5일 이내 완료됩니다.
          <br /> 회원가입 시 입력된 메일 주소로 가입승인 메일이 발송됩니다.
        </p>
      </div>
      {/* 결과모듈 */}

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
  );
}
