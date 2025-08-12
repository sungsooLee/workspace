import { createFileRoute } from '@tanstack/react-router';

import { Login, pageRouteConfig } from '@features/auth';
import { AUTH_CONTAINERS } from '@widgets/layout';

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      mobile: {
        showHeader: true,
      },
      title: '',
      container: AUTH_CONTAINERS.LOGIN,
    },
  }),
});

/**
 * @description FO 로그인
 * PC: NLP_FO_LOG_2000
 * MO: NLP_FO_LOG_MR2000
 */
function RouteComponent() {
  return <Login Route={Route} />;
}
