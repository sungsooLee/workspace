import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { Layout } from '../widgets/layout';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  // router.navigate({ to: '/login' });

  return (
    <div className="layout_wrap">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}
