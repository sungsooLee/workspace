import { CoursePackageDetail } from '@features/learning-operate/course-package';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/learning/course-package/detail/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CoursePackageDetail />;
}
