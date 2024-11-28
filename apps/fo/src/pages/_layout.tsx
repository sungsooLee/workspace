import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';

import { Button } from '@learnway/ui';

import { Navigate } from '../widgets/layout';
import { useFetchAuthUser } from '../entities/user';
import { useFetchTenant } from '../entities/tenant';
import { useLogoutUser } from '../entities/user';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const router = useRouter();

  const { data } = useFetchAuthUser();
  const { data: tenant } = useFetchTenant(data?.activeTenantId);
  const { logout } = useLogoutUser();

  useEffect(() => {
    if (!data) {
      router.navigate({ to: '/login' });
    }
  }, [data]);

  useEffect(() => {
    if (!tenant) {
      return;
    }
    document.title = tenant.windowTitle;
  }, [tenant]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <div className="flex h-60px bg-gray-300">
        <div className="flex gap-10 items-center">
          <Link to={'/'}>
            {(tenant?.logoImageUrl && <img src={tenant?.logoImageUrl} title={tenant.name} />) ??
              tenant?.name}
          </Link>
          <Navigate />
        </div>
        <div className="flex grow"></div>
        <div className="flex text-sm items-baseline justify-end gap-4 pt-4 pe-5">
          {data?.userName}님 로그인,{' '}
          <Button variant={'outline'} size={'sm'} onClick={() => handleLogout()}>
            로그아웃
          </Button>
        </div>
      </div>
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
