import { createFileRoute } from '@tanstack/react-router';
import { CourseCreate } from '@features/learning-operate/course/course-management';

export const Route = createFileRoute('/_layout/learning/course/create/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CourseCreate />;
}
