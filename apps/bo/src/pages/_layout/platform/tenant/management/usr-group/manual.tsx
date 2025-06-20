import { createFileRoute, useRouter } from '@tanstack/react-router';
import { t } from 'i18next';

import { PageContainer, MainContents, ContentsButtons } from '@widgets/layout';

import { Button } from '@learnway/ui';

import { TenantUserGroupManualManagementList } from '@features/tenant';

export const Route = createFileRoute('/_layout/platform/tenant/management/usr-group/manual')({
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
          onClick={() =>
            router.navigate({ to: '/platform/tenant/management/usr-group/handmade-detail' })
          }
          label={t('등록')}
        />
      </ContentsButtons>
      <MainContents>
        <TenantUserGroupManualManagementList rootPath="/platform" />
      </MainContents>
    </PageContainer>
  );
}
