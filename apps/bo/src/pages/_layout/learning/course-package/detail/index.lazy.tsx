import { CoursePackageDetail } from '@features/learning-operate/course-package';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/learning/course-package/detail/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CoursePackageDetail />;
}
