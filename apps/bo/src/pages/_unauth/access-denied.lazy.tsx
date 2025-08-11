import { createLazyFileRoute } from '@tanstack/react-router';

import { ErrorComponent } from '@features/layout/ui';
import { ERROR } from '@learnway/config';

export const Route = createLazyFileRoute('/_unauth/access-denied')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ErrorComponent error={ERROR.PAGE_ACCESS_DENIED} />;
}
