import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import styles from './_learning.module.css';
import { LearningLayout } from '../widgets/layout';
export const Route = createFileRoute('/_learning')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      <LearningLayout>
        <Outlet />
      </LearningLayout>
    </div>
  );
}
