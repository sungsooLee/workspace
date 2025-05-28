import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/regime/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
