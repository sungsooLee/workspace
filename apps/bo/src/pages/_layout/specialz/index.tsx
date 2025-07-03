import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/specialz/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div></div>;
}
