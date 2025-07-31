import { CompanyOrganization } from '@features/platform-management/company';
import { ContentsButtons, MainContents, PageContainer } from '@shared/ui';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';
import { useEffect } from 'react';
import { Button } from '@learnway/ui/button';

export const Route = createLazyFileRoute('/_layout/platform/company/organization/detail')({
  component: RouteComponent });

function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  useEffect(() => {
    if (!companyCode) router.navigate({ to: '/platform/company/organization' });
  }, []);

  const handleListClick = () => {
    const listParam = routerState.location.state?.listParam;
    router.navigate({ to: '/platform/company/organization', state: { listParam } });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="point"
          size="sm"
          onClick={handleListClick}
          label={t('LABEL.button.list')}
        />
      </ContentsButtons>
      <MainContents>
        <CompanyOrganization />
      </MainContents>
    </PageContainer>
  );
}
