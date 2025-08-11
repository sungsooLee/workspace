import { CourseDetailTabBaseProps } from '@features/learning-operate/course/course-management/types/type';
import {
  SequenceDetail,
  SequenceList,
} from '@features/learning-operate/learning-sequence/sequence-management';
import { useDynamicForm2 } from '@learnway/hooks';
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
  const { setCourseCreateInfo, setCheckDirtyForm } = useCourseActions();

  const {
    provider,
    updateFormData,
    onSubmit,
    onFormChange,
    onFormValid,
    getValues,
    setValue,
    formState,
    control,
    formValues,
    resetDirtyState,
  } = useDynamicForm2();

  useEffect(() => {
    setCourseCreateInfo({
      contentViewType: mode === 'MAIN' ? ContentViewType.LIST : ContentViewType.DETAIL,
    }); // 탭
    if (mode === 'MAIN') {
      resetDirtyState();
    }
  }, [mode]);

  useEffect(() => {
    const courseSequenceId = sequenceId;
    setCourseCreateInfo({ sequenceId: courseSequenceId });
  }, [sequenceId]);

  // form state 변경 시 폼 더티 체크 함수 설정
  useEffect(() => {
    setCheckDirtyForm(() => formState.isDirty);
  }, [formState.isDirty]);

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
      provider={provider}
      updateFormData={updateFormData}
      onSubmit={onSubmit}
      getValues={getValues}
      formValues={formValues}
      resetDirtyState={resetDirtyState}
    />
  );
});

export const Sequence = SequenceComponent;
