import { createFileRoute } from '@tanstack/react-router';

import { ResultBySignupProgressPage } from '@learnway/auth/pages';

export const Route = createFileRoute('/_auth/signup-progress/result')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResultBySignupProgressPage route={Route} />;
}
