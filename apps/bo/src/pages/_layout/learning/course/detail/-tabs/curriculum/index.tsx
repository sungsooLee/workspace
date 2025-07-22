import { TriggerKey, useCourseStore } from '@pages/_layout/learning/course/-store/use-course-store';
import { goToCourseList } from '@shared/index';
import { useUpdateEffect } from 'ahooks';
import { forwardRef } from 'react';
import { CourseDetailTabBaseProps, CourseDetailTabFormRef } from '../../../-common/type';

const CurriculumComponent = forwardRef<CourseDetailTabFormRef, CourseDetailTabBaseProps>(
  ({ courseId }, ref) => {
    const lastTriggered = useCourseStore((state) => state.lastTriggered);

    useUpdateEffect(() => {
      if (!lastTriggered) return;

      switch (lastTriggered.key) {
        case TriggerKey.LIST:
          return goToCourseList();
        case TriggerKey.SAVE:
          return saveFormData();
        case TriggerKey.DELETE:
          return deleteFormData();
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
