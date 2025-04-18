import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/menu/$menuId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout/menu/$menuId"!</div>;
}
