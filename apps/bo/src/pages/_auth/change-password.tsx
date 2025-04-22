import { createFileRoute } from '@tanstack/react-router';

import { ChangePasswordPage } from '@learnway/auth';

import { pageRouteConfig } from '../../features/auth';

export const Route = createFileRoute('/_auth/change-password')({
  component: RouteComponent,
  ...pageRouteConfig({
    authorization: true,
    meta: {
      title: 'LABEL.PASSWORD_CHANGE',
    },
  }),
});

function RouteComponent() {
  return <ChangePasswordPage route={Route} />;
}
