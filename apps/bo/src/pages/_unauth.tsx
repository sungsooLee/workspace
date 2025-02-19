import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
