import { Button } from '@learnway/ui/button';
// IA102 / NLP_BO_CMS_1001
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { LearningResourceTable } from '@features/learning-resource';
import { MainContents, PageContainer, ContentsButtons } from '@shared/ui';

export const Route = createLazyFileRoute('/_layout/learning/learning-resource/')({
  component: RouteComponent });

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
