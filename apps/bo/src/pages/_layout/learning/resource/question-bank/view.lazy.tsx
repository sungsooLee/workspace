import { useEffect, useState } from 'react';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { Button } from '@learnway/ui';
import { ContentsButtons, LinkBox, MainContents, PageContainer, SubContents } from '@shared/ui';

import { useLearningResourceQuestionDetailForm } from '@features/learning-resource/learning-resource-management/service/learning-resource-question-detail-from.hook';
import { LearningResourceQuestionBank } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank';

export const Route = createLazyFileRoute('/_layout/learning/resource/question-bank/view')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const { saveButtonClick, setBaseInfo } = useLearningResourceQuestionDetailForm();
  useEffect(() => {
    if (!routerState.location.state?.contentUuid) return;
    setBaseInfo(routerState.location.state?.contentUuid);
  }, [routerState.location.state]);
  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button variant="point" size="sm">
            목록
          </Button>
        </LinkBox>

        <Button type="submit" variant="primary" size="sm" onClick={() => saveButtonClick()}>
          저장
        </Button>
      </ContentsButtons>
      <MainContents>
        <LearningResourceQuestionBank />
      </MainContents>
    </PageContainer>
  );
}
