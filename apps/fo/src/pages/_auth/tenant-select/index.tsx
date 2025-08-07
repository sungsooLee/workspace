import { pageRouteConfig, TenantSelect } from '@features/auth';
import { createFileRoute } from '@tanstack/react-router';
import { t } from 'i18next';

export const Route = createFileRoute('/_auth/tenant-select/')({
  component: RouteComponent,
  ...pageRouteConfig({ authorization: true, meta: { title: t('테넌트 선택') } }),
});

/**
 * @description 테넌트 선택 NLP_FO_LOG_1000
 */
function RouteComponent() {
  return <TenantSelect />;
}
