import { createLazyFileRoute } from '@tanstack/react-router';
import { CourseCreate } from '@features/learning-operate/course/course-management';

export const Route = createLazyFileRoute('/_layout/learning/course/create/')({
  component: RouteComponent });

function RouteComponent() {
  return <CourseCreate />;
}
