import { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import { CourseDetailTabBaseProps, CourseDetailTabFormRef } from '../../../-common/type';
import {
  SequenceDetail,
  SequenceList,
} from '@features/learning-operate/learning-sequence/sequence-management';

const SequenceComponent = forwardRef<CourseDetailTabFormRef, CourseDetailTabBaseProps>(
  ({ courseId }, ref) => {
    const [mode, setMode] = useState<string>('MAIN');
    const [sequenceId, setSequenceId] = useState<number>(0);

    return mode === 'MAIN' ? (
      <SequenceList setMode={setMode} setSequenceId={setSequenceId} courseId={courseId} />
    ) : (
      <SequenceDetail ref={ref} setMode={setMode} courseId={courseId} sequenceId={sequenceId} />
    );
  },
);

export const Sequence = SequenceComponent;
