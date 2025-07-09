import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer, MainContents, ContentsButtons } from '@shared/ui';

import { Button } from '@learnway/ui';

import { TenantUserGroupManualManagementList } from '@features/platform-management/tenant';

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
          onClick={() => router.navigate({ to: '/platform/tenant/usr-group/manual-detail' })}
          label={t('등록')}
        />
      </ContentsButtons>
      <MainContents>
        <TenantUserGroupManualManagementList rootPath="/platform" />
      </MainContents>
    </PageContainer>
  );
}
