import { forwardRef } from 'react';
import { AssignmentTabRef } from '../service/assignment/type';

const LearningResourceAssignmentSubmissionComponent = forwardRef<AssignmentTabRef, any>(
  (props, ref) => {
    return <div>과제물 관리</div>;
  },
);

LearningResourceAssignmentSubmissionComponent.displayName = 'LearningResourceAssignmentSubmission';

export const LearningResourceAssignmentSubmission = LearningResourceAssignmentSubmissionComponent;
