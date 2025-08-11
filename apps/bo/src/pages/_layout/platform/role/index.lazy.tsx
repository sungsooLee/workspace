import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/platform/role/')({
  component: RouteComponent });

function RouteComponent() {
  return <div></div>;
}
