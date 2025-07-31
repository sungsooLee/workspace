import { pageRouteConfig, TenantSelect } from '@features/auth';
import { createFileRoute } from '@tanstack/react-router';

/**
 * @description screen_id: NLP_FO_LOG_1000 테넌트 선택
 */
export const Route = createFileRoute('/_auth/tenant-select/')({
  component: RouteComponent,
  ...pageRouteConfig({ authorization: true }),
});

function RouteComponent() {
  return <TenantSelect />;
}
