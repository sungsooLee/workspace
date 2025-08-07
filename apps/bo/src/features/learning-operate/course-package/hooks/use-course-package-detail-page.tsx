import { usePageState } from '@shared/lib';
import { useNavigate } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import { CoursePackageDetailTab } from '../types/type';

export interface CoursePackageDetailPageLocationState {
  initialTab?: CoursePackageDetailTab; // 초기 활성화 탭
}

export const useCoursePackageDetailPage = () => {
  const navigate = useNavigate();
  const { initialTab } = usePageState<CoursePackageDetailPageLocationState>();

  // 현재 활성화된 탭 상태 (기본값: 기본정보)
  const [activeTab, setActiveTab] = useState(initialTab ?? CoursePackageDetailTab.BASIC_INFO);

  /**
   * 탭을 변경하는 함수
   * @param tabKey 변경할 탭의 키
   */
  const changeTab = useCallback((tabKey: CoursePackageDetailTab) => {
    setActiveTab(tabKey);
    // setCourseCreateInfo({ activeTab: tabKey, contentViewType: ContentViewType.LIST });
  }, []);

  return {
    activeTab,
    changeTab,
  };
};
