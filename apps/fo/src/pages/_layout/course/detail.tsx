import { useCourseFullDetail } from '@entities/course';
import { CourseDetail } from '@features/course/detail/course-detail';
import { CourseDetailMobile } from '@features/course/detail/course-detail.mobile';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { BrowserView, MobileView } from 'react-device-detect';

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

  const testCourseId = 7;
  const { data: courseData, isLoading, isError } = useCourseFullDetail(courseId || testCourseId);

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러발생</div>;

  return (
    <>
      <BrowserView>
        <CourseDetail courseId={courseId || testCourseId} courseData={courseData} />
      </BrowserView>
      <MobileView>
        <CourseDetailMobile courseId={courseId || testCourseId} courseData={courseData} />
      </MobileView>
    </>
  );
}
