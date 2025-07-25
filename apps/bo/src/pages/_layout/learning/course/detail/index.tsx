import { createFileRoute } from '@tanstack/react-router';
import { CourseDetail } from '@features/learning-operate/course/course-management';

export const Route = createFileRoute('/_layout/learning/course/detail/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CourseDetail />;
}
