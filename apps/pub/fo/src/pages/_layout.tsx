import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { MobileView, BrowserView } from 'react-device-detect';
import { cn } from '@learnway/shared';

import { Header, Layout, Footer, MobileLayout } from '../widgets/layout';
import { MFooterFixed } from '../widgets/layout/ui/m.main/m.footer/m-footer-fixed';
import styles from './_layout.module.css';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  // router.navigate({ to: '/login' });

  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      <BrowserView>
        <Header />
        <Layout>
          <Outlet />
        </Layout>
        <Footer />
      </BrowserView>

      <MobileView>
        <MobileLayout>
          <Outlet />
        </MobileLayout>
        <MFooterFixed />
      </MobileView>
    </div>
  );
}
