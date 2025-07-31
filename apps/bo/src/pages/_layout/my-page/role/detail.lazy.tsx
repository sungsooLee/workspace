import { createLazyFileRoute } from '@tanstack/react-router';

import { pageRouteConfig } from '@features/auth';
import { MyRoleDetail } from '@features/user/my-page/ui/my-role-detail';

export const Route = createLazyFileRoute('/_layout/my-page/role/detail')({
  component: RouteComponent,
  ...pageRouteConfig({ meta: { title: '나의 권한' } }) });

function RouteComponent() {
  return <MyRoleDetail route={Route} />;
}
