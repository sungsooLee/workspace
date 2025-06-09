import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/platform/company/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
