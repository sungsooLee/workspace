// 코스 저장 관련 뮤테이션 훅들을 탭별로 매핑하여 반환하는 커스텀 훅입니다.
import {
  useUpdateCourseWizard1,
  useUpdateCourseWizard2,
  useUpdateCourseWizard3,
  useUpdateCourseWizard4,
  useUpdateCourseWizard5,
} from '@entities/course';
import { CourseTab } from '../-common/type';

export const useCourseSaveMutations = () => {
  // 각 탭에 해당하는 코스 저장 뮤테이션 훅을 객체로 반환합니다.
  return {
    [CourseTab.STEP1]: useUpdateCourseWizard1(),
    [CourseTab.STEP2]: useUpdateCourseWizard2(),
    [CourseTab.STEP3]: useUpdateCourseWizard3(),
    [CourseTab.STEP4]: useUpdateCourseWizard4(),
    [CourseTab.STEP5]: useUpdateCourseWizard5(),
  };
};
