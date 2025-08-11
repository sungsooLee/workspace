import { createFileRoute } from '@tanstack/react-router';

import { pageRouteConfig, PasswordModify } from '@features/auth';

export const Route = createFileRoute('/_auth/password-modify/')({
  component: RouteComponent,
  ...pageRouteConfig({ authorization: true }),
});

/**
 * @description 패스워드 변경, (임시패스워드, 180일 경과)
 *  PC : NLP_FO_LOG_2010, NLP_FO_LOG_2020
 *  MO : NLP_FO_LOG_MR_2010, NLP_FO_LOG_MR_2020
 */
function RouteComponent() {
  return <PasswordModify />;
}
