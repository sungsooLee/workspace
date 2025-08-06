import { createFileRoute } from '@tanstack/react-router';

import { TenantManagmentList } from '@features/platform-management/tenant';
import { MainContents, PageContainer } from '@shared/ui/layout';
export const Route = createFileRoute('/_layout/tenant/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <TenantManagmentList rootPath="/" roleInfo={'TENANT'} />
      </MainContents>
    </PageContainer>
  );
}
