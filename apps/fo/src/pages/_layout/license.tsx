import { createFileRoute } from '@tanstack/react-router';

import { License } from '../../features/platform';
import { pageRouteConfig } from '../../features/auth';

export const Route = createFileRoute('/_layout/license')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '오븐 소스 라이센스',
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
