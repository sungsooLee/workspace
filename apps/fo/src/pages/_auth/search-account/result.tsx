import { createFileRoute, Link } from '@tanstack/react-router';

import { pageRouteConfig } from '../../../features/auth';

export const Route = createFileRoute('/_auth/search-account/result')({
  component: RouteComponent,
  ...pageRouteConfig({
    // error 인 경우 throw message
    validate: ({ params, search, state }) => {
      if (!state?.email) {
        throw '잘못된 접근';
      }
      return;
    },
  }),
});

function RouteComponent() {
  const { state } = Route.useRouteContext();

  return (
    <div>
      Hello "/_auth/search-account/result"! <Link to="/login">{state?.email}</Link>
    </div>
  );
}
