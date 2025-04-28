import { createFileRoute } from '@tanstack/react-router';
import { RoleInfo } from '../../../../features/platform/role/ui/role-info';
import { PageContainer } from '../../../../widgets/layout/ui/container/page-container';
import { MainContents } from '../../../../widgets/layout/ui/container/slot/main-contents';

export const Route = createFileRoute('/_layout/platform/role/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PageContainer scrollHidden={true}>
      <MainContents>
        <RoleInfo />
      </MainContents>
    </PageContainer>
  );
}
