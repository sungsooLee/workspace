import { createFileRoute } from '@tanstack/react-router';
import type { ParsedLocation } from '@tanstack/react-router';

import { z } from '@learnway/shared';
import { authSSOQueryOptions } from '@learnway/auth';

const ssoSearchSchema = z.object({
  state: z.string().required(),
  code: z.string().required(),
});

export const Route = createFileRoute('/sso/redirect')({
  component: RouteComponent,
  validateSearch: ssoSearchSchema,
  beforeLoad: async ({
    location,
    context,
    search,
  }: {
    location: ParsedLocation;
    context: any;
    search: any;
  }) => {
    const queryClient = context.queryClient;
    const parameters = {
      state: search.state,
      authorizationCode: search.code,
      timezone: 'Asia/Seoul"',
    };
    const data = await queryClient.fetchQuery(authSSOQueryOptions.authSSOLogin(parameters));
    console.log('redirect data', search, data);
    //router.history.push(search.redirect);
  },
});

function RouteComponent() {
  return <div>Hello "/sso"!</div>;
}
