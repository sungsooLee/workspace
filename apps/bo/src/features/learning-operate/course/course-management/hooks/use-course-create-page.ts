import { useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';

import { useModal } from '@learnway/ui/modal';
import { usePageState } from '@shared/lib/use-page-state';
import { ContentViewType, useCheckDirtyForm, useCourseActions } from '../store/use-course-store';
import { CourseTab } from '../types/type';

// 라우터 state에서 전달받는 값의 타입 정의
interface LocationState {
  courseId?: number; // 과정 ID
  courseType?: string; // 과정 타입
  initialTab?: CourseTab; // 초기 활성화 탭
  initialContentViewType?: ContentViewType; // 초기 컨텐츠 뷰 타입
}

export const useCourseCreatePage = () => {
  const navigate = useNavigate();
  const { trigger, setCourseCreateInfo } = useCourseActions();
  const { confirmNavigation } = useModal();
  const { courseId, courseType, initialTab } = usePageState<LocationState>();
  const [activeTab, setActiveTab] = useState(initialTab ?? CourseTab.STEP1);
  const checkDirtyForm = useCheckDirtyForm();

  const moveCourseListPage = () => {
    navigate({
      to: '/learning/course',
    });
  };

  const handleChangeTab = (selectedTab: CourseTab) => {
    setActiveTab((state) => selectedTab);
  };

  const handleBeforeChange = useCallback(
    async (currentTabKey: string, nextTabKey: string) => {
      // console.log('use-course-create-page : callback.checkDirtyForm', checkDirtyForm);
      if (checkDirtyForm?.()) {
        return await confirmNavigation();
      }
      return true;
    },
    [checkDirtyForm, confirmNavigation],
  );

  useEffect(() => {
    // console.log('use-course-create-page : useEffect.courseId,courseType', formState);
    setCourseCreateInfo({ courseId, courseType, activeTab });
  }, [courseId, courseType, activeTab]);

  return {
    activeTab,
    trigger,
    changeTab: handleChangeTab,
    moveCourseListPage,
    isCreateMode: !courseId,
    contentViewType: ContentViewType,
    handleBeforeChange,
  };
};
