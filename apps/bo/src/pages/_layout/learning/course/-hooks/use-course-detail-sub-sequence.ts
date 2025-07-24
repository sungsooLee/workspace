import {
  TriggerKey,
  useCourseCreateInfo,
  useCourseLastTriggered,
} from '@pages/_layout/learning/course/-store/use-course-store';
import { usePageState } from '@shared/index';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { CourseDetailPageLocationState } from './use-course-detail-page';

export function useCourseDetailSubSequence() {
  const lastTriggered = useCourseLastTriggered();
  // const { courseId } = useCourseCreateInfo();
  const navigate = useNavigate();

  const { courseId, sequenceId } = usePageState<CourseDetailPageLocationState>();

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
    sequenceId,
  };
}
