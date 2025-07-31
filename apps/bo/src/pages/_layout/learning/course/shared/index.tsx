import { CourseShared } from '@features/learning-operate/course/course-management';
import { createFileRoute } from '@tanstack/react-router';

/**
 * NLP_BO_LMS_0056 공유받은 과정
 */
export const Route = createFileRoute('/_layout/learning/course/shared/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CourseShared />;
}
