import { CompanyUserList } from '@features/platform-management/company';
import { MainContents, PageContainer } from '@shared/ui/layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/platform/company/user/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <CompanyUserList detailPath="/platform/company/user/detail" />
      </MainContents>
    </PageContainer>
  );
}
