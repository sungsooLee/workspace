import {
  TriggerKey,
  useCourseLastTriggered } from '@features/learning-operate/course/course-management';
import { usePageState } from '@shared/lib';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { CourseDetailPageLocationState } from './use-course-detail-page';

export function useCourseDetailSubSequence() {
  const lastTriggered = useCourseLastTriggered();
  const navigate = useNavigate();

  const { courseId: initCourseId, sequenceId: initSequenceId } =
    usePageState<CourseDetailPageLocationState>();
  useUpdateEffect(() => {
    switch (lastTriggered?.key) {
      case TriggerKey.LIST:
        navigate({
          to: '/learning/course/detail',
          state: {
            courseId: initCourseId,
            courseName: '스마트제조를 위한 스마트공장 구축 및 추진실무 - MES구축' } });
        break;
    }
  }, [lastTriggered]);

  return {
    courseId: initCourseId,
    sequenceId: initSequenceId };
}
