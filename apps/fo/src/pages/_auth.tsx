import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AuthLayout } from '../widgets/layout';

import { pageRouteConfig } from '../features/auth';

import styles from './_auth.module.css';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  ...pageRouteConfig({ authorization: false }),
});

/**
 * @description FO _auth 로그인 화면 레이아웃
 */
function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </div>
  );
}
