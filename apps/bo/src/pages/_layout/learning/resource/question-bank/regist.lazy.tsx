import { useEffect, useState } from 'react';
import { MovieInfo } from '@features/learning-resource';
import { useLearningResourceQuestionDetailForm } from '@features/learning-resource/learning-resource-management/service/learning-resource-question-detail-from.hook';
import { LearningResourceQuestionBank } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank';
import { LearningResourceQuestionBankDetail } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank-detail';
import { Button, Tabs } from '@learnway/ui';
import { ContentsButtons, LinkBox, MainContents, PageContainer, SubContents } from '@shared/ui';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/learning/resource/question-bank/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  const { saveButtonClick, setBaseInfo } = useLearningResourceQuestionDetailForm();

  useEffect(() => {
    setBaseInfo(undefined);
  }, []);

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
