import {
  SequenceDetail,
  SequenceList,
} from '@features/learning-operate/learning-sequence/sequence-management';
import { forwardRef, useEffect, useState } from 'react';
import { CourseDetailTabBaseProps, CourseDetailTabFormRef } from '../../../../types/type';
import { useCourseDetailSubSequence } from '../../../../hooks/use-course-detail-sub-sequence';
import {
  ContentViewType,
  useCourseActions,
  useCourseLastTriggered,
} from '../../../../store/use-course-store';

const SequenceComponent = forwardRef<CourseDetailTabFormRef, CourseDetailTabBaseProps>((_, ref) => {
  const [mode, setMode] = useState<string>('MAIN');
  const lastTriggered = useCourseLastTriggered();
  const { courseId, sequenceId: initSequenceId } = useCourseDetailSubSequence();
  const [sequenceId, setSequenceId] = useState<number>(initSequenceId ?? 0);

  const { setCourseCreateInfo } = useCourseActions();

  useEffect(() => {
    console.log('lastTriggered', lastTriggered);
    setCourseCreateInfo({
      contentViewType: mode === 'MAIN' ? ContentViewType.LIST : ContentViewType.DETAIL,
    }); // 탭
  }, [mode]);

  // useEffect(() => {
  //   console.log('차수ID:', sequenceId);
  //   if (setCourseSequenceId) setCourseSequenceId(sequenceId);
  // }, [sequenceId]);

  return mode === 'MAIN' ? (
    <SequenceList setMode={setMode} setSequenceId={setSequenceId} courseId={courseId} />
  ) : (
    <SequenceDetail
      mode={mode}
      setMode={setMode}
      courseId={courseId}
      sequenceId={sequenceId}
      lastTriggered={lastTriggered}
    />
  );
});

export const Sequence = SequenceComponent;
