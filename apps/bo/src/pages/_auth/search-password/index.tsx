import { createFileRoute } from '@tanstack/react-router';
import { isEmpty } from 'lodash';
import { SearchAccountPage } from '@learnway/auth';

import { pageRouteConfig } from '../../../features/auth';
export const Route = createFileRoute('/_auth/search-password/')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: {
      tabKey: {
        format: 'string',
        default: 'password',
        conditions: [
          {
            fn: (values: any) => !['account', 'password'].includes(values.tabKey),
          },
        ],
      },
    },
    meta: {
      title: 'LABEL.common.searchPassword',
    },
  }),
});

function RouteComponent() {
  return <SearchAccountPage route={Route} enableTab={false} hiddenIcon={false} />;
}
