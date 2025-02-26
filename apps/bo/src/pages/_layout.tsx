import { useEffect } from 'react';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { useFetchAuthUser } from '@learnway/config';

import { Layout } from '../widgets/layout';
import { useFetchTenant } from '../entities/tenant';
import { authConfig } from '../features/auth';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
  ...authConfig(),
});

function LayoutComponent() {
  const { t } = useTranslation();

  const { data } = useFetchAuthUser();
  const { data: tenant } = useFetchTenant(data?.activeTenantId);

  useEffect(() => {
    if (!tenant) {
      return;
    }
    document.title = tenant.windowTitle;
  }, [tenant]);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
