import { createFileRoute } from '@tanstack/react-router';
import { MyRole } from '@features/user/my-page/ui/my-role';
import { pageRouteConfig } from '@features/auth';
import { MainContents, PageContainer } from '@shared/ui';

export const Route = createFileRoute('/_layout/my-page/role/')({
  component: RouteComponent,
  ...pageRouteConfig({ meta: { title: '나의 권한' } }) });

function RouteComponent() {
  return (
    <PageContainer>
      <MainContents>
        <MyRole route={Route} />
      </MainContents>
    </PageContainer>
  );
}
