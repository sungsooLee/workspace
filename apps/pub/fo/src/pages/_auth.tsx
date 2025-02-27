import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import styles from './_auth.module.css';
import { AuthLayout } from '../widgets/layout';
export const Route = createFileRoute('/_auth')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </div>
  );
}
