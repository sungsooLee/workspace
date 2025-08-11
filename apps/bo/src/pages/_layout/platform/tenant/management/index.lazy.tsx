import { useRouter, createLazyFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';

import { ContentsButtons, MainContents, PageContainer } from '@shared/ui/layout';

import { TenantManagementList } from '@features/platform-management/tenant/ui/tenant-management-list';
import { Button } from '@learnway/ui/button';

export const Route = createLazyFileRoute('/_layout/platform/tenant/management/')({
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
          onClick={() => router.navigate({ to: '/platform/tenant/management/regist' })}
        >
          {t('등록')}
        </Button>
      </ContentsButtons>
      <MainContents>
        <TenantManagementList rootPath="/platform" roleInfo={'PLATFORM'} />
      </MainContents>
    </PageContainer>
  );
}
