import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { MobileView, BrowserView } from 'react-device-detect';

import { cn } from '@learnway/shared';

import { Layout, MobileLayout } from '../widgets/layout';

import { useFetchAuthUser } from '@learnway/config';
import { useFetchTenant } from '../entities/tenant';
import { pageRouteConfig } from '../features/auth';

import styles from '@learnway/styles/fo/pages/_layout.module.css';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
  ...pageRouteConfig({ authorization: true }),
});

function LayoutComponent() {
  const { t } = useTranslation();

  const { data } = useFetchAuthUser();
  const { data: tenant } = useFetchTenant(data?.activeTenant?.tenantId);

  useEffect(() => {
    if (!tenant) {
      return;
    }
    document.title = tenant.windowTitle ?? '';
  }, [tenant]);

  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
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
    </div>
  );
}
