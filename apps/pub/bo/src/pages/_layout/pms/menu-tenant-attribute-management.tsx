import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/pms/menu-tenant-attribute-management')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout/pms/menu-tenant-attribute-management"!</div>;
}
