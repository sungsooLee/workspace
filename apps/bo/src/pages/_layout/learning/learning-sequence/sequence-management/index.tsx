import { Enrollment } from '@features/learning-operate/learning-sequence/enrollment-application/ui/enrollment';
import {
  SequenceDetail,
  SequenceList,
} from '@features/learning-operate/learning-sequence/sequence-management';
import { Button, Divider, ToggleButtonGroup, useModal } from '@learnway/ui';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';
import { useState } from 'react';

export const Route = createFileRoute('/_layout/learning/learning-sequence/sequence-management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [mode, setMode] = useState<string>('MAIN');
  const [sequenceId, setSequenceId] = useState<number>(0);
  return (
    <PageContainer>
      {/* <ContentsButtons>
        <ToggleButtonGroup
          defaultValue={'edu'}
          options={[
            { label: '과정관리', value: 'course' },
            { label: '수강관리', value: 'edu' },
          ]}
          onChange={(value) => setBtnState(value)}
        />
        <Divider orientation="vertical" />
        {btnState === 'course' && (
          <>
            <Button variant="point" size="sm" label={t('목록')} />
            <Divider orientation="vertical" />
            <Button variant="point" size="sm" label={t('삭제')} />
            <Button variant="primary" size="sm">
              {t('저장')}
            </Button>
          </>
        )}
      </ContentsButtons> */}
      <MainContents>
        {mode === 'MAIN' ? (
          <SequenceList setMode={setMode} setSequenceId={setSequenceId} courseId={1} />
        ) : (
          <SequenceDetail setMode={setMode} courseId={1} sequenceId={sequenceId} />
        )}
      </MainContents>
    </PageContainer>
  );
}
