import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/tenant/')({
  component: RouteComponent });

function RouteComponent() {
  return <div></div>;
}
