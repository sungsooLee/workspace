import { createFileRoute, useRouter } from '@tanstack/react-router';

import { PageContainer, MainContents, ContentsButtons } from '@widgets/layout';
import { Button } from '@learnway/ui';

import { TenantManagmentList } from '@features/tenant/management/ui/tenant-managment-list';

export const Route = createFileRoute('/_layout/platform/tenant/management/')({
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
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <TenantManagmentList rootPath="/platform" roleInfo={'PLATFORM'} />
      </MainContents>
    </PageContainer>
  );
}
