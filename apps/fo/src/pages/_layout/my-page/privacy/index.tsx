import { createFileRoute } from '@tanstack/react-router';

import { pageRouteConfig } from '../../../../features/auth';

export const Route = createFileRoute('/_layout/my-page/privacy/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '개인정보변경',
      mobile: { showHeader: false, showFooter: false, showMainFooter: false },
    },
  }),
});

function RouteComponent() {
  return <div>Hello "/_layout/my-page/privacy/"!</div>;
}
