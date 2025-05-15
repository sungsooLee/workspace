import { useEffect } from 'react';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { useFetchAuthUser } from '@learnway/auth';

import { Layout } from '../widgets/layout';
import { useFetchTenant } from '../entities/tenant';
import { pageRouteConfig } from '../features/auth';

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
    // TODO 테넌트 윈도우 타이틀 확인
    // document.title = tenant.windowTitle;
  }, [tenant]);

  return (
    <div className="layout_wrap">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}
