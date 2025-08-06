import { createFileRoute } from '@tanstack/react-router';

import { pageRouteConfig } from '@features/auth';
import { License } from '@features/layout';

export const Route = createFileRoute('/_layout/license/')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '오픈 소스 라이센스',
      mobile: { showHeader: false, showFooter: false, showMainFooter: false },
    },
  }),
});

function RouteComponent() {
  return (
    <div>
      <License />
    </div>
  );
}
