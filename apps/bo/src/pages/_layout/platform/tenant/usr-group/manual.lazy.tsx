import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';

import { TenantUserGroupManualManagementList } from '@features/platform-management/tenant';
import { Button } from '@learnway/ui/button';
import { EnFormMode } from '@shared/types';

export const Route = createLazyFileRoute('/_layout/platform/tenant/usr-group/manual')({
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
          onClick={() => router.navigate({ to: '/platform/tenant/usr-group/manual-detail', state: {mode: EnFormMode.ADD} })}
          label={t('등록')}
        />
      </ContentsButtons>
      <MainContents>
        <TenantUserGroupManualManagementList />
      </MainContents>
    </PageContainer>
  );
}
