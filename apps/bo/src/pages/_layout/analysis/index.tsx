import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/analysis/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
