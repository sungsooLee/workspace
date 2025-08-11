import { CourseManagement } from '@features/learning-operate/course/course-management/ui/course-management/course-management';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/learning/course/management/')({
  component: RouteComponent });

function RouteComponent() {
  return <CourseManagement />;
}
