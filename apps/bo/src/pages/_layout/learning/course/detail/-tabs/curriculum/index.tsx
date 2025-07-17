import { forwardRef, useImperativeHandle } from 'react';
import { CourseDetailTabBaseProps, CourseDetailTabFormRef } from '../../../-common/type';

const CurriculumComponent = forwardRef<CourseDetailTabFormRef, CourseDetailTabBaseProps>(
  ({ courseId }, ref) => {
    // 부모 컴포넌트에서 호출할 수 있는 메서드
    useImperativeHandle(ref, () => ({
      getValues: () => console.log('getValues'),
      save: async () => {
        console.log('save');
        return true;
      },
    }));

    return <>Curriculum</>;
  },
);

export const Curriculum = CurriculumComponent;
