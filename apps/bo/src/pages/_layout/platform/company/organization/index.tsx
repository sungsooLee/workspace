import { createFileRoute } from '@tanstack/react-router';
import { CompanyList } from '@features/platform-management/company';
import { MainContents, PageContainer } from '@shared/ui';

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
