import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import styles from '@learnway/styles/fo/pages/_learning.module.css';

export const Route = createFileRoute('/_learning')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  return <Outlet />;
}
