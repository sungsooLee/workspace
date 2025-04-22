import { Button } from '@learnway/ui';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { PageContainer } from '../../../../../widgets/layout/ui/container/page-container';
import { ContentsButtons } from '../../../../../widgets/layout/ui/container/slot/contents-buttons';
import { MainContents } from '../../../../../widgets/layout/ui/container/slot/main-contents';

export const Route = createFileRoute('/_layout/platform/system/label/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  /**
   * 등록화면 이동
   */
  const handleNewTranslation = () => {
    //router.navigate({ to: '/platform/system/translation', state: { keyType: 'COMMON_CODE' } });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button type="button" variant="point" size="sm" onClick={handleNewTranslation}>
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <span>Contents</span>
      </MainContents>
    </PageContainer>
  );
}
