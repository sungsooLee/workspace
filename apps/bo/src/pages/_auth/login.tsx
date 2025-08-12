import { createFileRoute } from '@tanstack/react-router';

import { Login, pageRouteConfig } from '@features/auth';

import { AUTH_CONTAINERS } from '@widgets/layout';

// import { usePermissionStore } from '../../shared/lib/permission-store';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
  ...pageRouteConfig({
    authorization: false,
    meta: {
      title: 'LABEL.common.loginWelcomeMessage',
      container: AUTH_CONTAINERS.LOGIN,
    },
  }),
});

/**
 * @description BO 로그인
 * PC: NLP_BO_LOG_1000
 */
function RouteComponent() {
  return <Login Route={Route} />;
}
