import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button } from '@learnway/ui';
import { isMobile } from 'react-device-detect';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css';
import styles from '@learnway/styles/fo/pages/_layout/course-registration/course-registration-complete.module.css';

import { IcoComplete, IcoCaution02 } from '@learnway/icons';

export const Route = createFileRoute('/_layout/course-registration/course-registration-complete')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.complete}`}>
      <div className={`${proccessResultStyles.start} ${styles.success_info}`}>
        <i className={proccessResultStyles.ico}>
          {/* 완료 */}
          <IcoComplete stroke="#00AFD5" />
          {/* 마감 안내 */}
          {/* <IcoCaution02 stroke="#ffb902" /> */}
        </i>
        {/* 완료 */}
        <h3 className={proccessResultStyles.title}>수강 신청이 완료되었습니다!</h3>
        <p className={proccessResultStyles.noti}>
          본 과정은 결재가 필요한 과정입니다.
          <br />
          결재는 수강 신청 후 1~3주가 소요되니 양해부탁드립니다.
        </p>
        {/* 마감 안내 */}
        {/* <h3 className={proccessResultStyles.title}>마감 안내</h3>
        <p className={proccessResultStyles.noti}>
          아쉽게도 해당 과정의 수강인원이
          <br />
          마감이 되었습니다.
          <br />
          다른 차수를 신청해주세요.
        </p> */}
      </div>

      {/* button */}
      <BrowserView>
        <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
          <Button variant="gray" size="xl">
            홈
          </Button>
          <Button variant="primary" size="xl">
            결재함
          </Button>
        </div>
      </BrowserView>

      <MobileView>
        <MobileContainerFooter>
          <div className={cn(authFormStyles.btn_wrap, styles.btn_wrap, 'auth--btn_wrap')}>
            <Button variant="gray" size="xl" className="min">
              홈
            </Button>
            <Button variant="primary" size="xl">
              결재함
            </Button>
          </div>
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}
