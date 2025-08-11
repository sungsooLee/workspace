import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/platform/company/')({
  component: RouteComponent });

function RouteComponent() {
  return <div></div>;
}
