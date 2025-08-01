import {
  TriggerKey,
  useCourseCreateInfo,
  useCourseLastTriggered } from '@features/learning-operate/course/course-management';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';

export function useCourseDetailSubCurriculum() {
  const lastTriggered = useCourseLastTriggered();
  const { courseId } = useCourseCreateInfo();
  const navigate = useNavigate();

  useUpdateEffect(() => {
    switch (lastTriggered?.key) {
      case TriggerKey.LIST:
        navigate({
          to: '/learning/course' });
        break;
    }
  }, [lastTriggered]);

  return {
    courseId };
}
