import { createFileRoute } from '@tanstack/react-router';

import { metaConfig } from '../../../features/auth';

interface MenuParams {
  menuId?: string;
}

export const Route = createFileRoute('/_layout/menu/$menuId')({
  component: RouteComponent,
  ...metaConfig({ mobile: { showFooter: false } }),
});

function RouteComponent() {
  const { menuId } = Route.useParams();

  return <div>Hello "/menu/$menuId"! {menuId}</div>;
}
