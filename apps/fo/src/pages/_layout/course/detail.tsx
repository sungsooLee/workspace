import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { BrowserView, MobileView } from 'react-device-detect';
import { CourseDetail } from '@features/course/course-detail';
import { CourseDetailMobile } from '@features/course/course-detail.mobile';
import { useEffect } from 'react';

export const Route = createFileRoute('/_layout/course/detail')({
  component: RouteComponent,
});

// FO 과정상세 : NLP_FO_LEC_1000
function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const courseId = routerState.location.state?.courseId;
  // useEffect(() => {
  //   if (!courseId) router.navigate({ to: '/course/detail' });
  // }, [courseId, router]);

  return (
    <>
      <BrowserView>
        <CourseDetail />
      </BrowserView>
      <MobileView>
        {/* <CourseDetailMobile /> */}
      </MobileView>
    </>
  );
}
