import { useFetchCourseRegistrationStatus } from '@entities/enroll';
import { AcceptingPopup } from '@features/layout';
import { useModal } from '@learnway/ui/modal';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { EnrollQueueStatusType } from '@types';
import { useEffect, useMemo } from 'react';
import { isMobile } from 'react-device-detect';

export const Route = createFileRoute('/_layout/course/registration-pending')({
  component: RouteComponent,
});

function RouteComponent() {
  const { alert: openAlert, openModal } = useModal();

  const routerState = useRouterState();
  const router = useRouter();
  const { enrollQueueId } = routerState.location.state;
  const { data } = useFetchCourseRegistrationStatus(enrollQueueId);

  const enrollQueueStatusType = useMemo<EnrollQueueStatusType | 'INIT'>(
    () => data?.enrollQueueStatusType || 'INIT',
    [data],
  );

  useEffect(() => {
    if (enrollQueueStatusType === 'QUEUE') {
      openModal({
        width: isMobile ? 'm_full' : 'md',
        hideCloseButton: true,
        content: <AcceptingPopup />,
      });
    } else if (enrollQueueStatusType === 'WAITING') {
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
    } else if (
      enrollQueueStatusType === 'PROCESSED' ||
      enrollQueueStatusType === 'QUOTA_EXCEED' ||
      enrollQueueStatusType === 'ERROR'
    ) {
      router.navigate({
        to: '/course/registration-complete',
        state: { enrollQueueId },
      });
    }
  }, [enrollQueueStatusType]);
  return <div></div>;
}
