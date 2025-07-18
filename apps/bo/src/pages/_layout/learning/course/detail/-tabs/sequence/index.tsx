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

    // 부모 컴포넌트에서 호출할 수 있는 메서드
    useImperativeHandle(ref, () => ({
      getValues: () => console.log('getValues'),
      save: async () => {
        console.log('save');
        return true;
      },
    }));

    return mode === 'MAIN' ? (
      <SequenceList setMode={setMode} setSequenceId={setSequenceId} courseId={courseId} />
    ) : (
      <SequenceDetail setMode={setMode} courseId={courseId} sequenceId={sequenceId} />
    );
  },
);

export const Sequence = SequenceComponent;
