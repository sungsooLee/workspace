import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { Navigate, QuickMenu } from '../widgets/layout';
import { Logo, UserAvatar, Notification, Language } from '../features/layout';

import { useFetchAuthUser } from '../entities/user';
import { useFetchTenant } from '../entities/tenant';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  const { data } = useFetchAuthUser();
  const { data: tenant } = useFetchTenant(data?.activeTenantId);

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

  return (
    <div>
      <div className="bg-secondary-1 flex flex-col">
        <div className="flex items-center gap-10">
          <Logo />
          <div className="flex grow"></div>
          <Language />
          <Notification />
          <UserAvatar />
        </div>
        <div className="flex items-center">
          <Navigate />
          <div className="flex grow"></div>
          <QuickMenu />
        </div>
      </div>
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
