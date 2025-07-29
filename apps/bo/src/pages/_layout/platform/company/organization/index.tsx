import { CompanyList } from '@features/platform-management/company';
import { MainContents, PageContainer } from '@shared/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/platform/company/organization/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <CompanyList detailPath={'/platform/company/organization/detail'} />
      </MainContents>
    </PageContainer>
  );
}
