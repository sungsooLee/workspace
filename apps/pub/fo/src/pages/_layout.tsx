import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { GNB, Layout, Footer } from '../widgets/layout';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  // router.navigate({ to: '/login' });

  return (
    <div className="_layout_wrap">
      <GNB />
      <Layout>
        <Outlet />
      </Layout>
      <Footer />
    </div>
  );
}
