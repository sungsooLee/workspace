import { createLazyFileRoute } from '@tanstack/react-router';
import { CourseDetail } from '@features/learning-operate/course/course-management';

export const Route = createLazyFileRoute('/_layout/learning/course/detail/')({
  component: RouteComponent });

function RouteComponent() {
  return <CourseDetail />;
}
