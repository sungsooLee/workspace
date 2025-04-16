import { createFileRoute } from '@tanstack/react-router';

import { SearchAccountPage } from '@learnway/auth';

import { pageRouteConfig } from '../../../features/auth';

export const Route = createFileRoute('/_auth/search-account/')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateSearch: {
      tabKey: {
        format: 'string',
        default: 'account',
        conditions: [
          {
            fn: (values: any) => !['account', 'password'].includes(values.tabKey),
          },
        ],
      },
    },
    meta: {
      title: 'LABEL.ACCOUNT_PASSWORD_SEARCH',
    },
  }),
});

function RouteComponent() {
  return <SearchAccountPage route={Route} />;
}
