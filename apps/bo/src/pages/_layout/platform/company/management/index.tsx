import { t } from 'i18next';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { CompanyList } from '@features/platform-management/company';
import { MainContents, PageContainer, ContentsButtons } from '@shared/ui';

export const Route = createFileRoute('/_layout/platform/company/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="primary"
          size="sm"
          onClick={() => router.navigate({ to: '/platform/company/management/regist' })}
        >
          {t('등록')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <CompanyList />
      </MainContents>
    </PageContainer>
  );
}
