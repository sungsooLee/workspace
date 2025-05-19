import { createFileRoute } from '@tanstack/react-router';

import { SignupProgressPage } from '@learnway/auth';

import { pageRouteConfig } from '../../../features/auth';
import { AUTH_CONTAINERS } from '@widgets/layout';
import {} from '@types';

export const Route = createFileRoute('/_auth/signup-progress/')({
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
