import { createFileRoute } from '@tanstack/react-router';

import { Dormant, pageRouteConfig } from '@features/auth';

export const Route = createFileRoute('/_auth/dormant/')({
  component: RouteComponent,
  ...pageRouteConfig({ authorization: true }),
});

/**
 * @description FO 휴면계정 안내
 * PC: NLP_FO_LOG_2002
 * MO: NLP_FO_LOG_MR_2002
 */
function RouteComponent() {
  return <Dormant />;
}
