import { useEffect } from 'react';
import { t } from 'i18next';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { ContentsButtons } from '@widgets/layout';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { CompanyOrganization } from '@features/platform/company';

export const Route = createFileRoute('/_layout/platform/company/organization/detail')({
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
