import { createFileRoute } from '@tanstack/react-router';

import { pageRouteConfig } from '../../../features/auth';

interface MenuParams {
  menuId?: string;
}

export const Route = createFileRoute('/_layout/menu/$menuId')({
  component: RouteComponent,
  ...pageRouteConfig({ meta: { mobile: { showFooter: false } } }),
});

function RouteComponent() {
  const { menuId } = Route.useParams();

  return <div>Hello "/menu/$menuId"! {menuId}</div>;
}
