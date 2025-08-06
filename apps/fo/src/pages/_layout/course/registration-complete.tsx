import { EnrollQueueStatusType, useFetchCourseRegistrationStatus } from '@entities/enroll';
import { IcoError02, IcoSucess03 } from '@learnway/icons';
import styles from '@learnway/styles/fo/pages/_layout/course/registration-complete.module.css';
import proccessResultStyles from '@learnway/styles/fo/widgets/auth/ui/proccess-result.module.css';
import { Button } from '@learnway/ui/button';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { useMemo } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';
import { MobileContainerFooter } from '../../../shared/m.ui/container-footer/container-footer';

export const Route = createFileRoute('/_layout/course/registration-complete')({
  component: RouteComponent,
});

function RouteComponent() {
  const routerState = useRouterState();
  const router = useRouter();
  const { enrollQueueId } = routerState.location.state;
  const { data } = useFetchCourseRegistrationStatus(enrollQueueId);

  const enrollQueueStatusType = useMemo<EnrollQueueStatusType | 'INIT'>(
    () => data?.enrollQueueStatusType || 'INIT',
    [data],
  );

  // alert
  const goToHome = () => {
    // router.navigate()
  };
  const goToPayment = () => {
    // router.navigate()
  };

  return (
    <div className={`${styles.start} ${styles.complete}`}>
      <div className={`${proccessResultStyles.start} ${styles.success_info}`}>
        <i className={proccessResultStyles.ico}>
          {/* 완료 */}
          {(enrollQueueStatusType === 'PROCESSED' || enrollQueueStatusType === 'WAITING') && (
            <IcoSucess03 width={isMobile ? 56 : 80} height={isMobile ? 56 : 80} />
          )}
          {/* 마감 안내 */}
          {enrollQueueStatusType === 'QUOTA_EXCEED' && (
            <IcoError02 width={isMobile ? 56 : 80} height={isMobile ? 56 : 80} />
          )}
          {enrollQueueStatusType === 'ERROR' && (
            <IcoError02 width={isMobile ? 56 : 80} height={isMobile ? 56 : 80} />
          )}
        </i>

        {/* 완료 */}
        {(enrollQueueStatusType === 'PROCESSED' || enrollQueueStatusType === 'WAITING') && (
          <div className={proccessResultStyles.noti_box}>
            <h3 className={proccessResultStyles.title}>수강 신청이 완료되었습니다!</h3>
            <p className={proccessResultStyles.noti}>
              본 과정은 결재가 필요한 과정입니다.
              <br />
              결재는 수강 신청 후 1~3주가 소요되니 양해부탁드립니다.
            </p>
          </div>
        )}
        {/* 마감 안내 */}
        {enrollQueueStatusType === 'QUOTA_EXCEED' && (
          <div className={proccessResultStyles.noti_box}>
            <h3 className={proccessResultStyles.title}>마감 안내</h3>
            <p className={proccessResultStyles.noti}>
              아쉽게도 해당 과정의 수강인원이 마감이되었습니다.
              <br />
              다른 차수를 신청해주세요.
            </p>
          </div>
        )}
        {/* 에러 발생 */}
        {enrollQueueStatusType === 'ERROR' && (
          <div className={proccessResultStyles.noti_box}>
            <h3 className={proccessResultStyles.title}>ERROR</h3>
            <p className={proccessResultStyles.noti}>
              ERROR
              <br />
              ERROR
            </p>
          </div>
        )}
      </div>

      {/* button */}
      <BrowserView>
        <div className={styles.btn_box}>
          <Button variant="gray" size="xl">
            홈으로
          </Button>
          <Button variant="primary" size="xl" onClick={goToHome}>
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
            <Button variant="primary" size="xl" onClick={goToPayment}>
              결재함
            </Button>
          </div>
        </MobileContainerFooter>
      </MobileView>
    </div>
  );
}
