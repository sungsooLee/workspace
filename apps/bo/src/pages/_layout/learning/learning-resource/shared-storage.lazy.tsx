// IA104 / NLP_BO_CMS_1045 학습자원 현지화-공유함
import { LearningResourceSharedTable } from '@features/learning-resource';
import { MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/learning/learning-resource/shared-storage')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <LearningResourceSharedTable />
      </MainContents>
    </PageContainer>
  );
}
