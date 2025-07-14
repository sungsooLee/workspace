import { forwardRef } from 'react';
import { CourseTabBaseProps, TabFormRef } from '../../../-common/type';

const SequenceComponent = forwardRef<TabFormRef, CourseTabBaseProps>(
  ({ onSave, onConfigPropChange, data: { formData, courseConfig, isSaved } }, ref) => {
    return <>Sequence</>;
  },
);

export const Sequence = SequenceComponent;
