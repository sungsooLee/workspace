import { createFileRoute } from '@tanstack/react-router';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';
import { CompanyList } from '@features/platform/company/ui/company-list';

export const Route = createFileRoute('/_layout/platform/company/organization/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <CompanyList />
      </MainContents>
    </PageContainer>
  );
}
