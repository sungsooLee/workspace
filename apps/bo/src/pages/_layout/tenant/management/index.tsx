import { createFileRoute } from '@tanstack/react-router';

import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';

import { TenantManagmentList } from '@features/tenant/management/ui/tenant-managment-list';
export const Route = createFileRoute('/_layout/tenant/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <TenantManagmentList rootPath="/" />
      </MainContents>
    </PageContainer>
  );
}
