import {
  TriggerKey,
  useCourseLastTriggered,
} from '@pages/_layout/learning/course/-store/use-course-store';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { forwardRef } from 'react';
import { CourseDetailTabBaseProps, CourseDetailTabFormRef } from '../../../-common/type';
import { Route as CourseRoute } from '../../../index';

const CurriculumComponent = forwardRef<CourseDetailTabFormRef, CourseDetailTabBaseProps>(
  (_, ref) => {
    const lastTriggered = useCourseLastTriggered();
    const navigate = useNavigate();
    useUpdateEffect(() => {
      if (!lastTriggered) return;

      switch (lastTriggered.key) {
        case TriggerKey.LIST:
          navigate({ to: CourseRoute.to });
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
  },
);

export const Curriculum = CurriculumComponent;
