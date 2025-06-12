import { createFileRoute, useRouter } from '@tanstack/react-router';

import { PageContainer, MainContents, ContentsButtons } from '@widgets/layout';

import { Button } from '@learnway/ui';

import { TenantUserGroupHandmadeList } from '@features/tenant/management/user-group/ui/tenant-user-group-handmade-list';

export const Route = createFileRoute('/_layout/platform/tenant/management/usr-group/handmade')({
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
        >
          등록
        </Button>
      </ContentsButtons>
      <MainContents>
        <TenantUserGroupHandmadeList rootPath="/platform" />
      </MainContents>
    </PageContainer>
  );
}
