import { useCallback, useMemo, useRef, useState } from 'react';
import { CourseDetailTab, CourseDetailTabFormRef } from '../-common/type';
import { ContentViewType, useCourseActions, useCourseStore } from '../-store/use-course-store';

/**
 * 과정 상세 페이지에서 탭 상태 및 탭별 ref, 값 조회 등을 관리하는 커스텀 훅
 * @param courseType 과정 타입 (옵션)
 */
export const useCourseDetailPage = (courseType?: string) => {
  // 현재 활성화된 탭 컨텐츠의 뷰 타입
  const contentViewType = useCourseStore((state) => state.contentViewType);

  // 현재 활성화된 탭 상태 (기본값: 과정상세)
  const [activeTab, setActiveTab] = useState(CourseDetailTab.COURSE_DETAIL);

  // 각 탭의 ref를 저장하는 객체 (탭별로 폼 ref를 관리)
  const tabRefs = useRef<Record<string, CourseDetailTabFormRef | null>>({
    [CourseDetailTab.COURSE_DETAIL]: null, // 과정상세 탭 ref
    [CourseDetailTab.CURRICULUM]: null, // 커리큘럼 탭 ref
    [CourseDetailTab.SEQUENCE]: null, // 차수 탭 ref
    [CourseDetailTab.COMMUNITY]: null, // 커뮤니티 탭 ref
  });

  /**
   * 탭을 변경하는 함수
   * @param tabKey 변경할 탭의 키
   */
  const changeTab = useCallback((tabKey: CourseDetailTab) => {
    setActiveTab(tabKey);
  }, []);

  /**
   * 현재 활성화된 탭의 ref에 접근하여 값을 가져오는 함수
   * @returns 현재 탭의 getValues() 결과 또는 null
   */
  const getTabValues = () => tabRefs.current[activeTab]?.getValues?.() ?? null;

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
    // 현재 활성화된 탭
    activeTab,
    // 탭별 ref 객체
    tabRefs,
    // 탭 변경 함수
    changeTab,
    // 현재 탭의 값 조회 함수
    getTabValues,
    // 버튼 표시 상태
    visibleButtons,
  };
};
