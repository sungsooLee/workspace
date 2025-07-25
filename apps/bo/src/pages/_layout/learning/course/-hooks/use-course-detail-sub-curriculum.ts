import {
  TriggerKey,
  useCourseCreateInfo,
  useCourseLastTriggered,
} from '@pages/_layout/learning/course/-store/use-course-store';
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
          to: '/learning/course',
        });
        break;
    }
  }, [lastTriggered]);

  return {
    courseId,
  };
}
