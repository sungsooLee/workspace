import {
  SequenceDetail,
  SequenceList,
} from '@features/learning-operate/learning-sequence/sequence-management';
import { MainContents, PageContainer } from '@shared/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import { Mode } from '../-common/type';

/**
 * [NLP_BO_LMS_0031] 차수 관리
 */
export const Route = createFileRoute('/_layout/learning/learning-sequence/sequence-management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

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
          />
        )}
      </MainContents>
    </PageContainer>
  );
}
