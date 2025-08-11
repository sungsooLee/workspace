import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_layout/my-page/privacy/withdraw-menbership')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_layout/my-page/withdraw-menbership"!</div>;
}
