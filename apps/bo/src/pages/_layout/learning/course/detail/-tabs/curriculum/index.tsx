import { forwardRef } from 'react';
import { CourseTabBaseProps, TabFormRef } from '../../../-common/type';

const CurriculumComponent = forwardRef<TabFormRef, CourseTabBaseProps>(
  ({ onSave, onConfigPropChange, data: { formData, courseConfig, isSaved } }, ref) => {
    return <>Curriculum</>;
  },
);

export const Curriculum = CurriculumComponent;
