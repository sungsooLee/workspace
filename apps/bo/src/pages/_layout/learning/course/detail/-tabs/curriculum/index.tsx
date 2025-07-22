import { forwardRef, useEffect } from 'react';
import { CourseDetailTabBaseProps, CourseDetailTabFormRef } from '../../../-common/type';
import { useCourseActions } from '@pages/_layout/learning/course/-store/use-course-store';
import { useCourseStore } from '@pages/_layout/learning/course/-store/use-course-store';
import { useUpdateEffect } from 'ahooks';

const CurriculumComponent = forwardRef<CourseDetailTabFormRef, CourseDetailTabBaseProps>(
  ({ courseId }, ref) => {
    const saveTrigger = useCourseStore((state) => state.saveTrigger);
    const { setSaveStatus } = useCourseActions();

    // 'saveTrigger' 값이 변경될 때마다 저장 로직 실행
    useUpdateEffect(() => {
      saveFormData();
    }, [saveTrigger]); // saveTrigger가 바뀔 때마다 실행

    // 폼 데이터 저장
    const saveFormData = async () => {
      console.log('👶 폼 데이터 저장');
      setSaveStatus('success');
    };

    return <>Curriculum</>;
  },
);

export const Curriculum = CurriculumComponent;
