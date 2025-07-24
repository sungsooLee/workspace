import { useEffect, useState } from 'react';
import { CourseTab } from '../-common/type';

import { usePageState } from '@shared/lib/use-page-state';
import { useCourseActions } from '../-store/use-course-store';
import { useNavigate } from '@tanstack/react-router';
import { ac } from '@faker-js/faker/dist/airline-CLphikKp';

export const useCourseCreatePage = () => {
  const navigate = useNavigate();
  const { trigger, setCourseCreateInfo } = useCourseActions();

  const [activeTab, setActiveTab] = useState(CourseTab.STEP1);
  const { courseId, courseType } = usePageState();

  const moveCourseListPage = () => {
    navigate({
      to: '/learning/course',
    });
  };

  const handleChangeTab = (tab: CourseTab) => {
    setActiveTab((state) => tab);
  };

  useEffect(() => {
    console.log('----- useCourseCreatePage : useEffect', { courseId, courseType, activeTab });

    setCourseCreateInfo({ courseId, courseType, activeTab });
  }, [courseId, courseType, activeTab]);

  return {
    activeTab,
    trigger,
    changeTab: handleChangeTab,
    moveCourseListPage,
    isCreateMode: !courseId,
  };
};
