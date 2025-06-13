import { createFileRoute } from '@tanstack/react-router';
import type { ParsedLocation } from '@tanstack/react-router';

import { z } from '@learnway/shared';
import { authSSOQueryOptions } from '@learnway/auth/entities';
import { getHMGSSORedirectUrl } from '@learnway/auth/features/auth';

const ssoSearchSchema = z.object({
  company: z.string().required(),
});

export const Route = createFileRoute('/sso/')({
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
    const data = await queryClient.fetchQuery(authSSOQueryOptions.healthcheck(search.company));
    data.redirectUri = `${import.meta.env.VITE_BO_DOMAIN}/sso/redirect`;
    window.location.href = getHMGSSORedirectUrl(data);
  },
});

function RouteComponent() {
  return <div></div>;
}
