import { TenantCompanyOrganizationList } from '@features/platform-management/company';
import { MainContents, PageContainer } from '@shared/ui/layout';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/platform/tenant/organization/')({
  component: RouteComponent,
});

/**
 * 화면번호: NLP_BO_TMS_1111_01
 * @returns
 */
function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <TenantCompanyOrganizationList rootPath="/platform" roleInfo={'TENANT'} />
      </MainContents>
    </PageContainer>
  );
}
