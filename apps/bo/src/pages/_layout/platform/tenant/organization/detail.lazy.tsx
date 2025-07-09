import { useEffect } from 'react';
import { createLazyFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';

import { Button } from '@learnway/ui';

import { CompanyOrganization } from '@features/platform-management/company';
import { MainContents, PageContainer, ContentsButtons } from '@shared/ui';

export const Route = createLazyFileRoute('/_layout/platform/tenant/organization/detail')({
  component: RouteComponent,
});

/**
 * 화면 번호 : NLP_BO_TMS_1111_03
 * @returns
 */
function RouteComponent() {
  const router = useRouter();
  const routerState = useRouterState();
  const companyCode = routerState.location.state?.companyCode;

  useEffect(() => {
    if (!companyCode) router.navigate({ to: '/platform/tenant/organization' });
  }, [companyCode]);

  const handleListButtonClick = () => {
    const listParam = routerState.location.state?.listParam;
    console.log('listParam-detail', listParam);
    router.navigate({
      to: '/platform/tenant/organization',
      state: { listParam },
    });
  };

  return (
    <PageContainer>
      <ContentsButtons>
        <Button
          variant="point"
          size="sm"
          stopPropagation
          onClick={handleListButtonClick}
          label={t('목록')}
        />
      </ContentsButtons>

      <MainContents>
        <CompanyOrganization />
      </MainContents>
    </PageContainer>
  );
}
