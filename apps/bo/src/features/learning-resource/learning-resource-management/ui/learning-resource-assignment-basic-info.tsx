import { forwardRef } from 'react';
import { AssignmentTabRef } from '../service/assignment/type';
import { DynamicFormProvider } from '@learnway/hooks';

type AssignmentBasicInfoProps = {
  provider: DynamicFormProvider;
};

const LearningResourceAssignmentBasicInfoComponent = forwardRef<
  AssignmentTabRef,
  AssignmentBasicInfoProps
>(({ provider }, ref) => {
  return <div>과제 정보</div>;
});

LearningResourceAssignmentBasicInfoComponent.displayName = 'LearningResourceAssignmentBasicInfo';

export const LearningResourceAssignmentBasicInfo = LearningResourceAssignmentBasicInfoComponent;
