import { createLazyFileRoute } from '@tanstack/react-router';

interface MenuParams {
  menuId?: string;
}

export const Route = createLazyFileRoute('/_layout/menu/$menuId')({
  component: RouteComponent });

function RouteComponent() {
  const { menuId } = Route.useParams();

  return <div>Hello2 "/menu/$menuId"! {menuId}</div>;
}
