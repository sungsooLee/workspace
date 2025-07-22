import { router } from '../../main';

export const goTo = (path: string, params?: any) => {
  router.navigate({ to: path, params });
};

export const goToCourseList = () => {
  router.navigate({ to: '/learning/course' });
};

export const goToCourseCreate = (courseId?: number) => {
  router.navigate({ to: '/learning/course/create/view', params: { courseId } });
};

export const goToCourseDetail = (courseId: number) => {
  router.navigate({ to: '/learning/course/detail/view', params: { courseId } });
};

export const goToCourseListTest = () => {
  router.navigate({ to: '/learning_test/course' });
};

export const goToCourseCreateTest = (courseId?: number) => {
  router.navigate({ to: '/learning_test/course/create/view', params: { courseId } });
};

export const goToCourseDetailTest = (courseId: number) => {
  router.navigate({ to: '/learning_test/course/detail/view', params: { courseId } });
};
