import { useCallback, useRef, useState } from 'react';
import { CourseDetailTab, CourseTabData, TabFormRef } from '../-common/type';

import { useCreateCourse, useDeleteCourse, useUpdateCourse } from '@entities/course';
import { queryOptions } from '@entities/course/service/course.queries';
import { useQueryClient } from '@tanstack/react-query';
import { Course, CourseConfig } from '@types';
import {
  getDummyCourse,
  getDummyCourse2,
  getDummyCourse4,
  getDummyCourseConfig,
} from './course-mock-data';

export const useCourseDetailForm = (courseType?: string) => {
  // 현재 활성 탭
  const [activeTab, setActiveTab] = useState(CourseDetailTab.COURSE_DETAIL);

  // QueryClient 인스턴스
  const queryClient = useQueryClient();
  // 각 탭별 훅
  const createCourse = useCreateCourse();
  const saveMutations = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  // 각 탭의 ref 관리
  const tabRefs = useRef<Record<string, TabFormRef | null>>({
    [CourseDetailTab.COURSE_DETAIL]: null, // BasicInfo
    [CourseDetailTab.CURRICULUM]: null, // CourseRegistration
    [CourseDetailTab.SEQUENCE]: null, // Curriculum
    [CourseDetailTab.COMMUNITY]: null, // DetailInfo
  });

  // 전체 폼 데이터 상태
  const [data, setData] = useState<CourseTabData>({
    formData: responseDataToFormData({
      courseType,
    } as Course),
    courseConfig: {} as CourseConfig,
    isSaved: false,
  });

  // ref 설정 함수들
  const setTabRef = useCallback((tabKey: string, ref: TabFormRef | null) => {
    tabRefs.current[tabKey] = ref;
  }, []);

  // 특정 탭의 유효성 검사
  const validateTab = useCallback(async (tabKey: string) => {
    const currentRef = tabRefs.current[tabKey];
    if (!currentRef) {
      return { isValid: false, data: null, errors: '해당 탭은 아직 구현되지 않았습니다.' };
    }

    try {
      const result = await currentRef.validate();
      return result;
    } catch (error) {
      console.error(`${tabKey} 탭 유효성 검사 중 오류:`, error);
      return { isValid: false, data: null, errors: '유효성 검사 중 오류가 발생했습니다.' };
    }
  }, []);

  // 데이터 항목 설정 정보 조회
  const loadCourseConfig = useCallback(
    async (courseType: string, channelUuid: string) => {
      try {
        // 과정 항목 설정 정보 조회
        const courseConfig: CourseConfig = await queryClient.fetchQuery(
          queryOptions.getCourseConfig({
            courseType,
            channelUuid,
          }),
        );
        setData((prev: CourseTabData) => ({ ...prev, courseConfig }));
      } catch (error) {
        console.error('데이터 항목 설정 정보 조회 오류:', error);
      }
    },
    [queryClient],
  );

  // 데이터 조회
  const loadCourseData = useCallback(
    async (courseId: number) => {
      try {
        // 과정 상세 조회
        const rowData: Course = await queryClient.fetchQuery(queryOptions.get(courseId));
        const formData = responseDataToFormData(rowData);
        // 과정 항목 설정 정보 조회
        const courseConfig: CourseConfig = await queryClient.fetchQuery(
          queryOptions.getCourseConfig({
            courseType: formData.courseType,
            channelUuid: formData.channelUuid,
          }),
        );
        setData((prev: CourseTabData) => ({
          ...prev,
          formData,
          courseConfig,
          isSaved: true,
        }));
        return { success: true, data: formData };
      } catch (error) {
        console.error('데이터 조회 중 오류:', error);
        return { success: false, error };
      }
    },
    [queryClient],
  );

  // 새 과정 생성
  const createNewCourse = useCallback(
    async (requestData: Course) => {
      console.log('새로운 과정 생성:', requestData);
      return await createCourse.mutateAsync(requestData);
    },
    [createCourse],
  );

  // 기존 과정 업데이트
  const updateExistingCourse = useCallback(
    async (requestData: Course) => {
      console.log(`${activeTab} 탭 업데이트:`, requestData);
      return await saveMutations.mutateAsync(requestData);
    },
    [activeTab, saveMutations],
  );

  // 과정 저장 API 호출
  const saveCourseData = useCallback(
    async (formData: Partial<Course>) => {
      const requestData = formDataToRequestData(formData, activeTab);
      updateExistingCourse(requestData);
    },
    [activeTab, updateExistingCourse],
  );

  // 현재 활성 탭 저장
  const saveCurrentTab = useCallback(async () => {
    try {
      const { isValid, data: tabData, errors } = await validateTab(activeTab);
      if (!isValid) {
        throw new Error(`유효성 검사 에러 : ${errors}`);
      }
      await saveCourseData(tabData);
      return { success: true };
    } catch (error: any) {
      throw new Error(`저장 중 에러 : ${error.message}`);
    }
  }, [activeTab, validateTab, saveCourseData]);

  // 과정 삭제
  const deleteCourseData = useCallback(
    async (courseId: number) => {
      try {
        await deleteCourse.mutateAsync(courseId);
        return { success: true };
      } catch (error: any) {
        console.error('과정 삭제 중 오류:', error);
        throw new Error(`삭제 중 에러: ${error.message}`);
      }
    },
    [deleteCourse],
  );

  // 탭 변경
  const changeTab = useCallback((tabKey: CourseDetailTab) => {
    setActiveTab(tabKey);
  }, []);

  // 테스트용
  const loadMockData = useCallback((type = 1) => {
    const dummyData =
      type === 1
        ? getDummyCourse()
        : type === 2
          ? getDummyCourse2()
          : type === 4
            ? getDummyCourse4()
            : getDummyCourse();
    setData((prev: CourseTabData) => ({
      ...prev,
      formData: dummyData as Course,
      courseConfig: getDummyCourseConfig(),
    }));
  }, []);

  return {
    // 상태
    data,
    activeTab,
    tabRefs,
    // 액션
    setTabRef,
    validateTab,
    saveCurrentTab,
    deleteCourseData,
    loadCourseData,
    loadCourseConfig,
    changeTab,
    loadMockData,
    getTabValues: () => tabRefs.current[activeTab]?.getValues?.() ?? null,
  };
};

/**
 * 응답 데이터를 폼 데이터로 변환
 */
const responseDataToFormData = (response: Course) => {
  return response;
};

/**
 * 폼 데이터를 요청 데이터로 변환
 */
const formDataToRequestData = (formData: Partial<Course>, activeTab: CourseDetailTab): Course => {
  return {
    ...formData,
    wizardStep: activeTab,
  } as Course;
};
