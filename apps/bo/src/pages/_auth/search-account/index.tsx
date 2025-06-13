import { createFileRoute } from '@tanstack/react-router';
import { pageRouteConfig } from '@features/auth';
import { SearchAccountPage } from '@learnway/auth/pages';

export const Route = createFileRoute('/_auth/search-account/')({
  component: RouteComponent,
  ...pageRouteConfig({
    validateState: {
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
      title: 'LABEL.common.searchAccount',
    },
  }),
});

function RouteComponent() {
  return <SearchAccountPage route={Route} enableTab={false} hiddenIcon={false} />;
}
