import { createFileRoute } from '@tanstack/react-router';

import { MainContents, PageContainer } from '@shared/ui/layout';

import { TenantCompanyList } from '@features/platform-management/tenant/company/company-list';

export const Route = createFileRoute('/_layout/platform/tenant/company/')({
  component: RouteComponent,
});

/**
 * 화면번호: NLP_BO_TMS_1111_19
 * @returns
 */

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <TenantCompanyList />
      </MainContents>
    </PageContainer>
  );
}
