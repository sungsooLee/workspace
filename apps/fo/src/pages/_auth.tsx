import { createFileRoute, Outlet } from '@tanstack/react-router';
import { MobileView, BrowserView } from 'react-device-detect';

import { AuthLayout, MobileAuthLayout } from '../widgets/layout';

import { pageRouteConfig } from '../features/auth';

import styles from './_auth.module.css';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  ...pageRouteConfig({ authorization: false }),
});

function RouteComponent() {
  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      {/*
<BrowserView>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </BrowserView>
      <MobileView>
        <MobileAuthLayout>
          <Outlet />
        </MobileAuthLayout>
      </MobileView>      
       */}
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </div>
  );
}
