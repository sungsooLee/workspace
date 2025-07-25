import {
  TriggerKey,
  useCourseLastTriggered,
} from '@features/learning-operate/course/course-management';
import { usePageState } from '@shared/index';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { CourseDetailPageLocationState } from './use-course-detail-page';

export function useCourseDetailSubSequence() {
  const lastTriggered = useCourseLastTriggered();
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
