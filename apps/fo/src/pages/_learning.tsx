import { Outlet, createFileRoute, useRouter, Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { pageRouteConfig } from '../features/auth';

export const Route = createFileRoute('/_learning')({
  component: LayoutComponent,
  ...pageRouteConfig({ authorization: true }),
});

function LayoutComponent() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  return <Outlet />;
}
