import { createFileRoute } from '@tanstack/react-router';
import { MainContents, PageContainer } from '@shared/ui';
import { CompanyUserList } from '@features/platform-management/company';

export const Route = createFileRoute('/_layout/platform/company/user/')({
  component: RouteComponent });

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <CompanyUserList />
      </MainContents>
    </PageContainer>
  );
}
