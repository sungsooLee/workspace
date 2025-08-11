import { createLazyFileRoute } from '@tanstack/react-router';

import { TenantManagementList } from '@features/platform-management/tenant';
import { MainContents, PageContainer } from '@shared/ui/layout';
export const Route = createLazyFileRoute('/_layout/tenant/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <TenantManagementList rootPath="/" roleInfo={'TENANT'} />
      </MainContents>
    </PageContainer>
  );
}
