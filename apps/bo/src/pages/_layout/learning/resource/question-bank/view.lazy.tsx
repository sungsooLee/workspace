import { useEffect, useState } from 'react';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';

import { ContentsButtons, LinkBox, MainContents, PageContainer, SubContents } from '@shared/ui';

import { useLearningResourceQuestionDetailForm } from '@features/learning-resource/learning-resource-management/service/learning-resource-question-detail-from.hook';
import { LearningResourceQuestionBank } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank';
import { Button } from '@learnway/ui/button';

export const Route = createLazyFileRoute('/_layout/learning/resource/question-bank/view')({
  component: RouteComponent });

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();

  const { saveButtonClick, setBaseInfo } = useLearningResourceQuestionDetailForm();

  const handleListButtonClick = async () => {
    router.navigate({ to: '/learning/learning-resource' });
  };

  const contentUuid = routerState.location.state?.contentUuid;

  useEffect(() => {
    if (!contentUuid) return;
    setBaseInfo(contentUuid);
  }, [contentUuid]);

  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button variant="point" size="sm" onClick={handleListButtonClick}>
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
