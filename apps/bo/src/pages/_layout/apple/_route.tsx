import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/apple/_route')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout/apple/router"!</div>;
}
