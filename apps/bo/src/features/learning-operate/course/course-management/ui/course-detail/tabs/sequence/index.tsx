import { CourseDetailTabBaseProps } from '@features/learning-operate/course/course-management/types/type';
import {
  SequenceDetail,
  SequenceList,
} from '@features/learning-operate/learning-sequence/sequence-management';
import { forwardRef, useEffect, useState } from 'react';
import { useCourseDetailSubSequence } from '../../../../hooks/use-course-detail-sub-sequence';
import {
  ContentViewType,
  useCourseActions,
  useCourseLastTriggered,
  useCourseStore,
} from '../../../../store/use-course-store';

const SequenceComponent = forwardRef<HTMLElement, CourseDetailTabBaseProps>((_, ref) => {
  const [mode, setMode] = useState<string>('MAIN');
  const lastTriggered = useCourseLastTriggered();
  const { courseId, sequenceId: initSequenceId } = useCourseDetailSubSequence();
  const [sequenceId, setSequenceId] = useState<number>(initSequenceId ?? 0);

  const { courseCreateInfo } = useCourseStore();
  const { setCourseCreateInfo } = useCourseActions();

  useEffect(() => {
    setCourseCreateInfo({
      contentViewType: mode === 'MAIN' ? ContentViewType.LIST : ContentViewType.DETAIL,
    }); // 탭
  }, [mode]);

  useEffect(() => {
    const courseSequenceId = sequenceId;
    setCourseCreateInfo({ sequenceId: courseSequenceId });
  }, [sequenceId]);

  return courseCreateInfo.contentViewType === ContentViewType.LIST ? (
    <SequenceList
      setMode={setMode}
      setSequenceId={setSequenceId}
      lastTriggered={lastTriggered}
      courseId={courseId}
    />
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
