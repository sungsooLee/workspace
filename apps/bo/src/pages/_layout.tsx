import { useEffect } from 'react';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { useFetchAuthUser, useLoginTimer } from '@learnway/auth/entities';

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
  // 로그아웃 처리 타이머
  const { time } = useLoginTimer();

  useEffect(() => {
    if (!tenant) {
      return;
    }
    // TODO 테넌트 윈도우 타이틀 확인
    // document.title = tenant.windowTitle;
  }, [tenant]);

  return (
    <div className="layout_wrap">
      {import.meta.env.VITE_APP_ENV === 'local' && (
        <div className="absolute right-96 top-5 z-50 h-10 w-10 text-red-600">{time}</div>
      )}
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}
