import { createFileRoute } from '@tanstack/react-router';
import { PageContainer, MainContents } from '@shared/ui';
import { TenantCompanyOrganizationList } from '@features/platform-management/company';

export const Route = createFileRoute('/_layout/platform/tenant/organization/')({
  component: RouteComponent });

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
