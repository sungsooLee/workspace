import { forwardRef, useState, useImperativeHandle, useEffect } from 'react';
import { CourseDetailTabBaseProps, CourseDetailTabFormRef } from '../../../-common/type';
import {
  SequenceDetail,
  SequenceList,
} from '@features/learning-operate/learning-sequence/sequence-management';

const SequenceComponent = forwardRef<CourseDetailTabFormRef, CourseDetailTabBaseProps>(
  ({ courseId, courseSequenceId, setCourseSequenceId }, ref) => {
    const [mode, setMode] = useState<string>('MAIN');
    const [sequenceId, setSequenceId] = useState<number>(0);

    useEffect(() => {
      console.log('차수ID:', sequenceId);
      if (setCourseSequenceId) setCourseSequenceId(sequenceId);
    }, [sequenceId]);

    return mode === 'MAIN' ? (
      <SequenceList setMode={setMode} setSequenceId={setSequenceId} courseId={courseId} />
    ) : (
      <SequenceDetail ref={ref} setMode={setMode} courseId={courseId} sequenceId={sequenceId} />
    );
  },
);

export const Sequence = SequenceComponent;
