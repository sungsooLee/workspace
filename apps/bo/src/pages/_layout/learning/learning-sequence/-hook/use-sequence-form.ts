import { useCallback, useRef, useState } from 'react';
import { SequenceTab, SequenceTabFormRef } from '../-common/type';

// import { useCreateCourse, useDeleteCourse, useUpdateCourse } from '@entities/course';
import { queryOptions } from '@entities/course/service/course.queries';
import { useQueryClient } from '@tanstack/react-query';
import { Course, CourseConfig } from '@types';

export const useSequenceForm = (sequenceId?: string) => {
  // 현재 활성 탭
  const [activeTab, setActiveTab] = useState(SequenceTab.ENROLLMENT_APPLICATION);

  // const deleteCourse = useDeleteCourse();

  // 각 탭의 ref 관리
  const tabRefs = useRef<Record<string, SequenceTabFormRef | null>>({
    [SequenceTab.ENROLLMENT_APPLICATION]: null, // BasicInfo
    [SequenceTab.STUDENT_MANAGEMENT]: null, // CourseRegistration
    [SequenceTab.EVALUATION_MANAGEMENT]: null, // Curriculum
  });

  // ref 설정 함수들
  const setTabRef = useCallback((tabKey: string, ref: SequenceTabFormRef | null) => {
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

  // 탭 변경
  const changeTab = useCallback((tabKey: SequenceTab) => {
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
    changeTab,
    getTabValues: () => tabRefs.current[activeTab]?.getValues?.() ?? null };
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
const formDataToRequestData = (formData: Partial<Course>, activeTab: SequenceTab): Course => {
  return {
    ...formData,
    wizardStep: activeTab } as Course;
};
