import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/tenant/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
