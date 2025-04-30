import { createFileRoute } from '@tanstack/react-router';

import { SignupProgressPage } from '@learnway/auth';

import { pageRouteConfig } from '../../../features/auth';

export const Route = createFileRoute('/_auth/signup-progress/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.common.signupProgressStatus',
    },
  }),
});

function RouteComponent() {
  return <SignupProgressPage route={Route} />;
}
