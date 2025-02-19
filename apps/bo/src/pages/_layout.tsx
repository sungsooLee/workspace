import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { MobileView, BrowserView } from 'react-device-detect';

import { cn } from '@learnway/shared';

import { Layout, MobileLayout } from '../widgets/layout';

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
      //router.navigate({ to: '/login' });
    }
  }, [data]);

  useEffect(() => {
    if (!tenant) {
      return;
    }
    document.title = tenant.windowTitle;
  }, [tenant]);

  return (
    <>
      <BrowserView>
        <Layout>
          <Outlet />
        </Layout>
      </BrowserView>
      <MobileView>
        <MobileLayout>
          <Outlet />
        </MobileLayout>
      </MobileView>
    </>
  );
}
