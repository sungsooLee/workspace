import { forwardRef } from 'react';
import { CourseTabBaseProps, TabFormRef } from '../../../-common/type';

const CommunityComponent = forwardRef<TabFormRef, CourseTabBaseProps>(
  ({ onSave, onConfigPropChange, data: { formData, courseConfig, isSaved } }, ref) => {
    return <>Community</>;
  },
);

export const Community = CommunityComponent;
