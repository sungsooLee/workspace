import { useEffect } from 'react';
import { t } from 'i18next';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { CompanyOrganization } from '@features/platform-management/company';
import { MainContents, PageContainer, ContentsButtons } from '@shared/ui';

export const Route = createLazyFileRoute('/_layout/platform/company/organization/detail')({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  useEffect(() => {
    if (!companyCode) router.navigate({ to: '/platform/company/organization' });
  }, [companyCode]);

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="point"
          size="sm"
          onClick={() => router.navigate({ to: '/platform/company/organization' })}
        >
          {t('LABEL.button.list')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <CompanyOrganization />
      </MainContents>
    </PageContainer>
  );
}
