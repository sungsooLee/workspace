import { Outlet, createFileRoute } from '@tanstack/react-router';

import { Navigate } from '../widgets/layout';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div>
      <div className="p-2 flex gap-2 text-lg">
        <Navigate />
      </div>
      <Outlet />
    </div>
  );
}
