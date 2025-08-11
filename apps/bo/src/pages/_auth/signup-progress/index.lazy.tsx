import { createLazyFileRoute } from '@tanstack/react-router';

import { SignupProgressPage } from '@learnway/auth/pages';

import { AUTH_CONTAINERS } from '@widgets/layout';
import { pageRouteConfig } from '../../../features/auth';

// 회원가입 진행 현황
export const Route = createLazyFileRoute('/_auth/signup-progress/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.common.signupProgressStatus',
      container: AUTH_CONTAINERS.AUTH_PROGRESS,
    },
  }),
});

function RouteComponent() {
  return <SignupProgressPage route={Route} />;
}
