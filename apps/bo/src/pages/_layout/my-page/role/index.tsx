import { createFileRoute } from '@tanstack/react-router';
import { MyRole } from '@features/user/my-page/ui/my-role';
import { pageRouteConfig } from '@features/auth';
import { PageContainer } from '@widgets/layout/ui/container/page-container';
import { MainContents } from '@widgets/layout/ui/container/slot/main-contents';

export const Route = createFileRoute('/_layout/my-page/role/')({
  component: RouteComponent,
  ...pageRouteConfig({ meta: { title: '나의 권한' } }),
});

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <MyRole route={Route} />
      </MainContents>
    </PageContainer>
  );
}
