// IA102 / NLP_BO_CMS_1001
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { LearningResourceTable } from '@features/learning/ui/learning-resource';

export const Route = createLazyFileRoute('/_layout/learning/learning-resource/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const handleRegister = async () => {
    router.navigate({ to: '/learning/learning-resource/regist' });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleRegister}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <LearningResourceTable />
      </MainContents>
    </PageContainer>
  );
}
