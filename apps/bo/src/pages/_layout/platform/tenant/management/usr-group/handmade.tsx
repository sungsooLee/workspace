import { createFileRoute } from '@tanstack/react-router';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';

import { TenantUserGroupHandmadeList } from '@features/tenant/management/user-group/ui/tenant-user-group-handmade-list';

export const Route = createFileRoute('/_layout/platform/tenant/management/usr-group/handmade')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <TenantUserGroupHandmadeList rootPath="/platform" />
      </MainContents>
    </PageContainer>
  );
}
