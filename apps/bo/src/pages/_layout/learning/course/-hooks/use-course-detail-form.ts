import { useCallback, useRef, useState } from 'react';
import { CourseDetailTab, CourseDetailTabFormRef } from '../-common/type';

import { useDeleteCourse } from '@entities/course';
import { Course } from '@types';

export const useCourseDetailForm = (courseType?: string) => {
  // 현재 활성 탭
  const [activeTab, setActiveTab] = useState(CourseDetailTab.COURSE_DETAIL);

  const deleteCourse = useDeleteCourse();

  // 각 탭의 ref 관리
  const tabRefs = useRef<Record<string, CourseDetailTabFormRef | null>>({
    [CourseDetailTab.COURSE_DETAIL]: null, // BasicInfo
    [CourseDetailTab.CURRICULUM]: null, // CourseRegistration
    [CourseDetailTab.SEQUENCE]: null, // Curriculum
    [CourseDetailTab.COMMUNITY]: null, // DetailInfo
  });

  // ref 설정 함수들
  const setTabRef = useCallback((tabKey: string, ref: CourseDetailTabFormRef | null) => {
    tabRefs.current[tabKey] = ref;
  }, []);

  // 현재 활성 탭 저장
  const saveTabData = useCallback(async () => {
    try {
      const currentRef = tabRefs.current[activeTab];

      if (!currentRef || !currentRef.save) {
        throw new Error('탭 데이터가 존재하지 않거나 저장 메서드가 없습니다.');
      }

      const result = await currentRef.save();

      if (!result) {
        throw new Error('탭 데이터 저장 실패');
      }

      return true;
    } catch (error: any) {
      throw new Error(`저장 중 에러 : ${error.message}`);
    }
  }, [activeTab]);

  // 현재 활성 탭 삭제
  const deleteTabData = useCallback(async () => {
    try {
      const currentRef = tabRefs.current[activeTab];

      if (!currentRef || !currentRef.delete) {
        throw new Error('탭 데이터가 존재하지 않거나 삭제 메서드가 없습니다.');
      }

      const result = await currentRef.delete();

      if (!result) {
        throw new Error('탭 데이터 저장 실패');
      }

      return true;
    } catch (error: any) {
      throw new Error(`삭제 중 에러 : ${error.message}`);
    }
  }, [activeTab]);

  const saveCurrentTab = useCallback(async () => {
    const currentRef = tabRefs.current[activeTab];
    if (!currentRef || !currentRef.save) {
      throw new Error('탭 데이터가 존재하지 않거나 저장 메서드가 없습니다.');
    }
    return await currentRef.save();
  }, [activeTab]);

  // 탭 변경
  const changeTab = useCallback((tabKey: CourseDetailTab) => {
    setActiveTab(tabKey);
  }, []);

  return {
    // 상태
    activeTab,
    tabRefs,
    // 액션
    setTabRef,
    saveTabData,
    deleteTabData,
    saveCurrentTab,
    changeTab,
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
