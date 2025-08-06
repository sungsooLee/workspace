import { CompanyList } from '@features/platform-management/company';
import { Button } from '@learnway/ui/button';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

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
          label={t('등록')}
        />
      </ContentsButtons>
      <MainContents>
        <CompanyList detailPath={'/platform/company/management/detail'} />
      </MainContents>
    </PageContainer>
  );
}
