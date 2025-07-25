import {
  TriggerKey,
  useCourseLastTriggered,
} from '@features/learning-operate/course/course-management';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { forwardRef } from 'react';
import { CourseDetailTabBaseProps } from '../../../../types/type';

const Component = forwardRef<HTMLElement, CourseDetailTabBaseProps>((_, ref) => {
  const lastTriggered = useCourseLastTriggered();
  const navigate = useNavigate();
  useUpdateEffect(() => {
    if (!lastTriggered) return;

    switch (lastTriggered.key) {
      case TriggerKey.LIST:
        navigate({ to: '/learning/course' });
        break;
      case TriggerKey.SAVE:
        saveFormData();
        break;
      case TriggerKey.DELETE:
        deleteFormData();
        break;
    }
  }, [lastTriggered]);

  // 저장
  const saveFormData = () => {
    console.log('👶 폼 데이터 저장');
  };

  // 삭제
  const deleteFormData = () => {
    console.log('👶 폼 데�터 삭제');
  };

  return <>Curriculum</>;
});

export const CurriculumByDetail = Component;
