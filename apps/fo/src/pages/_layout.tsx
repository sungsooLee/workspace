import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router';

import { useFetchAuthUser } from '../entities/user';
import { Navigate } from '../widgets/layout';
import { useEffect } from 'react';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const router = useRouter();
  const { data } = useFetchAuthUser();

  useEffect(() => {
    if (!data) {
      router.navigate({ to: '/login' });
    }
  }, [data]);

  return (
    <div>
      <div className="p-2 flex gap-2 text-lg">
        <Navigate />
      </div>
      <Outlet />
    </div>
  );
}
