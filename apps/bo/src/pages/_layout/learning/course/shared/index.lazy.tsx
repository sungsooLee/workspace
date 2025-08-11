import { CourseShared } from '@features/learning-operate/course/course-management';
import { createLazyFileRoute } from '@tanstack/react-router';

/**
 * NLP_BO_LMS_0056 공유받은 과정
 */
export const Route = createLazyFileRoute('/_layout/learning/course/shared/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CourseShared />;
}
