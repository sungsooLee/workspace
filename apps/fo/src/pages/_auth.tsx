import { createFileRoute, Outlet } from '@tanstack/react-router';

import { AuthLayout } from '../widgets/layout';

import styles from './_auth.module.css';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </div>
  );
}
