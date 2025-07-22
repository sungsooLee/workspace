import { router } from '../../main';

export const goTo = (path: string, params?: any) => {
  router.navigate({ to: path, params });
};

/**
 * 과정 목록 페이지로 이동합니다.
 */
export const goToCourseList = () => {
  router.navigate({ to: '/learning/course' });
};

/**
 * 과정 생성 페이지로 이동합니다.
 */
export const goToCourseCreate = (courseId?: number) => {
  router.navigate({ to: '/learning/course/create/view', params: { courseId } });
};

/**
 * 과정 상세 페이지로 이동합니다.
 */
export const goToCourseDetail = (courseId: number) => {
  router.navigate({ to: '/learning/course/detail/view', params: { courseId } });
};

/**
 * 과정 목록 페이지로 이동합니다.
 */
export const goToCourseListTest = () => {
  router.navigate({ to: '/learning_test/course' });
};

/**
 * 과정 생성 페이지로 이동합니다.
 */
export const goToCourseCreateTest = (courseId?: number) => {
  router.navigate({ to: '/learning_test/course/create/view', params: { courseId } });
};

/**
 * 과정 상세 페이지로 이동합니다.
 */
export const goToCourseDetailTest = (courseId: number) => {
  router.navigate({ to: '/learning_test/course/detail/view', params: { courseId } });
};
