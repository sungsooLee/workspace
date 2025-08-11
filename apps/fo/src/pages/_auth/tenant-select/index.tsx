import { createFileRoute } from '@tanstack/react-router';

import { pageRouteConfig, TenantSelect } from '@features/auth';

export const Route = createFileRoute('/_auth/tenant-select/')({
  component: RouteComponent,
  ...pageRouteConfig({ authorization: true }),
});

/**
 * @description 테넌트 선택 NLP_FO_LOG_1000
 */
function RouteComponent() {
  return <TenantSelect />;
}
