import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_auth/progress-status')({
  component: RouteComponent });

function RouteComponent() {
  return <div>Hello "/_auth/progress-status"!</div>;
}
