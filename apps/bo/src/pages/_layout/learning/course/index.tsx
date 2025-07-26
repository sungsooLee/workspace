import { createFileRoute } from '@tanstack/react-router';
import { CourseList } from '@features/learning-operate/course/course-management';
import { useCourseStore } from '@features/learning-operate/course/course-management';

export const Route = createFileRoute('/_layout/learning/course/')({
  component: RouteComponent,
  beforeLoad: () => {
    useCourseStore.getState().reset();
  },
});

function RouteComponent() {
  return <CourseList />;
}
