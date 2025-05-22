import { createFileRoute, useRouter, useMatches } from '@tanstack/react-router';

import { IdentityVerificationPage } from '@learnway/auth';

import { pageRouteConfig } from '../../features/auth';

export const Route = createFileRoute('/_auth/identity-verification')({
  component: RouteComponent,
  ...pageRouteConfig({
    // meta: {
    //   title: '본인 인증',
    // },
  }),
});

function RouteComponent() {
  return <IdentityVerificationPage route={Route} />;
}
