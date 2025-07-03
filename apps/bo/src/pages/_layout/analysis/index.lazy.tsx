import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/analysis/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
