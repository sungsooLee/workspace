// 코스 저장 관련 뮤테이션 훅들을 탭별로 매핑하여 반환하는 커스텀 훅입니다.
import { useUpdateCourse } from '@entities/course';
import { CourseDetailTab, CourseTab } from '../-common/type';

export const useCourseDetailSaveMutations = () => {
  // 각 탭에 해당하는 코스 저장 뮤테이션 훅을 객체로 반환합니다.
  return {
    [CourseDetailTab.COURSE_DETAIL]: useUpdateCourse(),
    [CourseDetailTab.CURRICULUM]: useUpdateCourse(),
    [CourseDetailTab.SEQUENCE]: useUpdateCourse(),
    [CourseDetailTab.COMMUNITY]: useUpdateCourse(),
  };
};
