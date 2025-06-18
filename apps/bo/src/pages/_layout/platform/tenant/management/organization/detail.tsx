import { useEffect } from 'react';
import { createFileRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { ContentsButtons } from '@widgets/layout/ui/container/slot/contents-buttons';

import { Button } from '@learnway/ui';

import { CompanyOrganization } from '@features/platform/company';

export const Route = createFileRoute('/_layout/platform/tenant/management/organization/detail')({
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
    if (!companyCode) router.navigate({ to: '/platform/tenant/management/organization' });
  }, [companyCode]);

  const handleListButtonClick = () => {
    const listParam = routerState.location.state?.listParam;
    console.log('listParam-detail', listParam);
    router.navigate({
      to: '/platform/tenant/management/organization',
      state: { listParam: listParam },
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
