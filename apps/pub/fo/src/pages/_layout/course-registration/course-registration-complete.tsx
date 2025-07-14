import { createFileRoute } from '@tanstack/react-router';
import { cn } from '@learnway/shared';
import { Button, useModal } from '@learnway/ui';
import { isMobile } from 'react-device-detect';
import { MobileView, BrowserView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

import authFormStyles from '@learnway/styles/fo/features/auth/ui/auth-form/auth-form.module.css';
import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css';
import styles from './course-registration-complete.module.css';

import { IcoSucess03, IcoError02 } from '@learnway/icons';

export const Route = createFileRoute('/_layout/course-registration/course-registration-complete')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert } = useModal();

  // alert
  const alert01 = () => {
    openAlert({
      title: <>수강신청 대기자 등록</>,
      content: (
        <>
          본 과정의 수강신청 대기자로 등록되었습니다.
          <br />
          수강 취소 발생시 순차적으로 연락드리겠습니다.
          <br />
          감사합니다.
        </>
      ),
    });
  };

  return (
    <div className={`${styles.start} ${styles.complete}`}>
      <div className={`${proccessResultStyles.start} ${styles.success_info}`}>
        <i className={proccessResultStyles.ico}>
          {/* 완료 */}
          <IcoSucess03 width={80} height={80} />
          {/* 마감 안내 */}
          {/* <IcoError02 width={80} height={80} /> */}
        </i>

        {/* 완료 */}
        <div className={proccessResultStyles.noti_box}>
          <h3 className={proccessResultStyles.title}>수강 신청이 완료되었습니다!</h3>
          <p className={proccessResultStyles.noti}>
            본 과정은 결재가 필요한 과정입니다.
            <br />
            결재는 수강 신청 후 1~3주가 소요되니 양해부탁드립니다.
          </p>
        </div>
        {/* 마감 안내 */}
        {/* <div className={proccessResultStyles.noti_box}>
          <h3 className={proccessResultStyles.title}>마감 안내</h3>
          <p className={proccessResultStyles.noti}>
            아쉽게도 해당 과정의 수강인원이 마감이되었습니다.
            <br />
            다른 차수를 신청해주세요.
          </p>
        </div> */}
      </div>

      {/* button */}
      <BrowserView>
        <div className={styles.btn_box}>
          <Button variant="gray" size="xl">
            홈으로
          </Button>
          <Button variant="primary" size="xl" onClick={() => alert01()}>
            결재함
          </Button>
        </div>
      </BrowserView>

      <MobileView>
        <MobileContainerFooter>
          <div className={styles.btn_box}>
            <Button variant="gray" size="xl" className="min">
              홈
            </Button>
            <Button variant="primary" size="xl" onClick={() => alert01()}>
              결재함
            </Button>
          </div>
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}
