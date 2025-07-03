import { createFileRoute } from '@tanstack/react-router';

import { SearchAccountPage } from '@learnway/auth/pages';

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
      title: 'LABEL.common.accountPasswordSearch',
    },
  }),
});

function RouteComponent() {
  return <SearchAccountPage route={Route} />;
}
