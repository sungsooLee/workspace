import { createFileRoute } from '@tanstack/react-router';

import { SignupProgressPage } from '@learnway/auth';

import { pageRouteConfig } from '../../../features/auth';

export const Route = createFileRoute('/_auth/signup-progress/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.SIGNUP_PROGRESS_STATUS',
    },
  }),
});

function RouteComponent() {
  return <SignupProgressPage route={Route} />;
}
