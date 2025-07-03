import { createFileRoute } from '@tanstack/react-router';

import { ChangePasswordPage } from '@learnway/auth/pages';

import { pageRouteConfig } from '../../features/auth';

export const Route = createFileRoute('/_auth/change-password')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'LABEL.common.passwordChange',
    },
  }),
});

function RouteComponent() {
  return <ChangePasswordPage route={Route} />;
}
