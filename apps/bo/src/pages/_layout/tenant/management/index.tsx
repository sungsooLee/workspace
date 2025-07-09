import { createFileRoute } from '@tanstack/react-router';


import { TenantManagmentList } from '@features/platform-management/tenant/ui/tenant-managment-list';
import { MainContents, PageContainer } from '@shared/ui';
export const Route = createFileRoute('/_layout/tenant/management/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <TenantManagmentList rootPath="/" roleInfo={'TENANT'}/>
      </MainContents>
    </PageContainer>
  );
}
