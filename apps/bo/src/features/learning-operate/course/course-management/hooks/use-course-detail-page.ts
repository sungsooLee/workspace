import { useModal } from '@learnway/ui/modal';
import { usePageState } from '@shared/lib';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useMemo, useState } from 'react';
import {
  ContentViewType,
  useCheckDirtyForm,
  useCourseActions,
  useCourseCreateInfo,
} from '../store/use-course-store';
import { CourseDetailTab } from '../types/type';
// 라우터 state에서 전달받는 값의 타입 정의
export interface CourseDetailPageLocationState {
  courseId?: number; // 과정 ID
  courseName?: string; // 과정명
  courseType?: string; // 과정 타입
  sequenceId?: number; // 차수 ID
  initialTab?: CourseDetailTab; // 초기 활성화 탭
  initialContentViewType?: ContentViewType; // 초기 컨텐츠 뷰 타입
}

/**
 * 과정 상세 페이지에서 탭 상태 및 탭별 ref, 값 조회 등을 관리하는 커스텀 훅
 */
export const useCourseDetailPage = () => {
  const navigate = useNavigate();
  // 라우터 state에서 courseId 가져오기
  const { courseId, courseName, courseType, initialTab, initialContentViewType } =
    usePageState<CourseDetailPageLocationState>();

  // 현재 활성화된 탭 컨텐츠의 뷰 타입
  const { contentViewType, sequenceId } = useCourseCreateInfo();
  const { confirmNavigation } = useModal();

  //
  const { setCourseCreateInfo } = useCourseActions();
  const checkDirtyForm = useCheckDirtyForm();

  // 현재 활성화된 탭 상태 (기본값: 과정상세)
  const [activeTab, setActiveTab] = useState(initialTab ?? CourseDetailTab.COURSE_DETAIL);

  /**
   * 탭을 변경하는 함수
   * @param tabKey 변경할 탭의 키
   */
  const changeTab = useCallback((tabKey: CourseDetailTab) => {
    setActiveTab(tabKey);
    setCourseCreateInfo({ activeTab: tabKey, contentViewType: ContentViewType.LIST });
  }, []);

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

  /**
   * 수강관리 화면으로 이동
   */
  const moveEnrollmentManagementPage = useCallback(() => {
    const state = {
      courseId,
      courseName,
      sequenceId: contentViewType === ContentViewType.LIST ? undefined : sequenceId,
      meta: { title: courseName },
    };
    navigate({
      to: '/learning/learning-sequence/enrollment-application',
      state,
    });
  }, [courseId, sequenceId]);

  /**
   * 버튼의 표시 여부를 결정하는 함수 (탭 변경 시 버튼 표시 여부 결정)
   */
  const visibleButtons = useMemo(() => {
    // 과정상세 탭일 때
    if (activeTab === CourseDetailTab.COURSE_DETAIL) {
      return {
        isTranslate: true,
        isCopy: true,
        isList: true,
        isDelete: true,
        isSave: true,
        isDivider: true,
      };
    }
    // 커리큘럼 탭일 때
    if (activeTab === CourseDetailTab.CURRICULUM) {
      return {
        isList: true,
      };
    }
    // 차수 탭일 때 (목록)
    if (activeTab === CourseDetailTab.SEQUENCE && contentViewType === ContentViewType.LIST) {
      return {
        isList: true,
      };
    }
    // 차수 탭일 때 (상세)
    if (activeTab === CourseDetailTab.SEQUENCE && contentViewType !== ContentViewType.LIST) {
      return {
        isList: true,
        isDelete: true,
        isSave: true,
        isDivider: true,
      };
    }
    // 커뮤니티 탭일 때
    if (activeTab === CourseDetailTab.COMMUNITY) {
      return {
        isList: true,
      };
    }
    return {};
  }, [activeTab, contentViewType]);

  return {
    // 과정명
    courseName,
    // 과정 유형
    courseType,
    // 현재 활성화된 탭
    activeTab,
    // 탭별 ref 객체
    changeTab,
    // 버튼 표시 상태
    visibleButtons,
    // 수강관리 화면으로 이동
    moveEnrollmentManagementPage,
    // 탭 변경 전
    handleBeforeChange,
  };
};
