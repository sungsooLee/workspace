import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import styles from './_layout.module.css';
import { HeaderAuth } from '../widgets/layout/ui/header/header-auth';
import { LayoutAuth } from '../widgets/layout/ui/layout/layout-auth';
export const Route = createFileRoute('/_auth')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      <HeaderAuth />
      <LayoutAuth>
        <Outlet />
      </LayoutAuth>
    </div>
  );
}
