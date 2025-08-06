import {
  TriggerKey,
  useCourseLastTriggered,
  useCourseStore,
} from '@features/learning-operate/course/course-management';
import { usePageState } from '@shared/lib';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { CourseDetailPageLocationState } from './use-course-detail-page';

export function useCourseDetailSubSequence() {
  const lastTriggered = useCourseLastTriggered();
  const navigate = useNavigate();
  const { courseCreateInfo } = useCourseStore();

  const { courseId: initCourseId, sequenceId: initSequenceId } =
    usePageState<CourseDetailPageLocationState>();
  useUpdateEffect(() => {
    switch (lastTriggered?.key) {
      case TriggerKey.LIST:
        if (courseCreateInfo.contentViewType === 'list') {
          navigate({
            to: '/learning/course',
          });
        }
        break;
    }
  }, [lastTriggered]);

  return {
    courseId: initCourseId,
    sequenceId: initSequenceId,
  };
}
