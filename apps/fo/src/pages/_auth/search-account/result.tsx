import { createFileRoute } from '@tanstack/react-router';

import { pageRouteConfig } from '../../../features/auth';

import { ResultBySearchAccountPage } from '@learnway/auth/pages';

export const Route = createFileRoute('/_auth/search-account/result')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: {
      email: {
        format: 'email',
        required: true,
      },
    },
    meta: {
      title: 'LABEL.common.accountSearch',
    },
  }),
});

function RouteComponent() {
  return <ResultBySearchAccountPage route={Route} />;
}
