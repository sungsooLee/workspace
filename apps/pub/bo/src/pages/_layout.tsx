import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { GNB, Layout } from '../widgets/layout';

import styles from './_layout.module.css';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  // router.navigate({ to: '/login' });

  return (
    <div className={styles.bo_wrap}>
      <GNB />
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}
