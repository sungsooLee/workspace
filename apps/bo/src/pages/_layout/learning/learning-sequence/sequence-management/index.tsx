import {
  SequenceDetail,
  SequenceList,
} from '@features/learning-operate/learning-sequence/sequence-management';
import { useDynamicForm2 } from '@learnway/hooks';
import { useModal } from '@learnway/ui/modal';
import { MainContents, PageContainer } from '@shared/ui/layout';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Mode } from '../-common/type';

/**
 * [NLP_BO_LMS_0059] 차수 관리
 */
export const Route = createFileRoute('/_layout/learning/learning-sequence/sequence-management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { alert: openAlert } = useModal();

  useEffect(() => {
    openAlert({
      content: '준비중입니다',
    });
  }, []);

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

  // 페이지 모드, 과정ID, 차수ID
  const { pMode, pCourseId, pSequenceId } = router.state.location.state;
  const [mode, setMode] = useState<string>(!pMode ? Mode.MAIN : pMode);
  const [sequenceId, setSequenceId] = useState<number>(pSequenceId);
  return (
    <PageContainer>
      <MainContents>
        {mode === Mode.MAIN ? (
          <SequenceList setMode={setMode} setSequenceId={setSequenceId} />
        ) : (
          <SequenceDetail
            mode={mode}
            setMode={setMode}
            courseId={pCourseId}
            sequenceId={sequenceId}
            provider={provider}
            updateFormData={updateFormData}
            onSubmit={onSubmit}
            getValues={getValues}
            formValues={formValues}
            resetDirtyState={resetDirtyState}
          />
        )}
      </MainContents>
    </PageContainer>
  );
}
