import {
  SequenceDetail,
  SequenceList,
} from '@features/learning-operate/learning-sequence/sequence-management';
import { useNavigate } from '@tanstack/react-router';
import { useUpdateEffect } from 'ahooks';
import { forwardRef, useEffect, useState } from 'react';
import { CourseDetailTabBaseProps, CourseDetailTabFormRef } from '../../../-common/type';
import {
  ContentViewType,
  TriggerKey,
  useCourseActions,
  useCourseStore,
} from '../../../-store/use-course-store';
import { Route as CourseRoute } from '../../../index';

const SequenceComponent = forwardRef<CourseDetailTabFormRef, CourseDetailTabBaseProps>(
  ({ courseId, courseSequenceId, setCourseSequenceId }, ref) => {
    const [mode, setMode] = useState<string>('MAIN');
    const [sequenceId, setSequenceId] = useState<number>(0);
    const lastTriggered = useCourseStore((state) => state.lastTriggered);
    const { setContentViewType } = useCourseActions();
    const navigate = useNavigate();

    useUpdateEffect(() => {
      switch (lastTriggered?.key) {
        case TriggerKey.LIST:
          navigate({ to: CourseRoute.to });
          break;
        case TriggerKey.SAVE:
          break;
        case TriggerKey.DELETE:
          // handleDeleteAction(lastTriggered.payload);
          break;
      }
    }, [lastTriggered]);

    useEffect(() => {
      console.log('lastTriggered', lastTriggered);
      setContentViewType(mode === 'MAIN' ? ContentViewType.LIST : ContentViewType.DETAIL); // 탭
    }, [mode]);

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
