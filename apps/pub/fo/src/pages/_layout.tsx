import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { Header, Layout, Footer } from '../widgets/layout';
import styles from './_layout.module.css';

// mobile import
import { MHeader } from '../widgets/layout/ui/header/m-header';
import { MFooterFixed } from '../widgets/layout/ui/footer/m-footer-fixed';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  // router.navigate({ to: '/login' });

  return (
    <div className={`${styles.start} ${styles.layout_wrap} ${styles.mo}`}>
      {/* pc */}
      <Header />

      {/* mobile */}
      <MHeader />

      <Layout>
        <Outlet />
      </Layout>
      <Footer />

      {/* mobile */}
      <MFooterFixed />
    </div>
  );
}
