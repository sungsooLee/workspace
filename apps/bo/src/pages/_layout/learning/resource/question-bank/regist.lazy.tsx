import { MovieInfo } from '@features/learning-resource';
import { LearningResourceQuestionBank } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank';
import { LearningResourceQuestionBankDetail } from '@features/learning-resource/learning-resource-management/ui/learning-resource-question-bank-detail';
import { Button, Tabs } from '@learnway/ui';
import { ContentsButtons, LinkBox, MainContents, PageContainer, SubContents } from '@shared/ui';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createLazyFileRoute('/_layout/learning/resource/question-bank/regist')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <ContentsButtons>
        <LinkBox>
          <Button variant="point" size="sm">
            목록
          </Button>
        </LinkBox>

        <Button variant="point" size="sm">
          삭제
        </Button>
        <Button type="submit" variant="primary" size="sm">
          저장
        </Button>
      </ContentsButtons>
      <MainContents>
        <LearningResourceQuestionBank />
      </MainContents>
    </PageContainer>
  );
}
