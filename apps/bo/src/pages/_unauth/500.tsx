import { ErrorComponent } from '@features/layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unauth/500')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ErrorComponent error={''}></ErrorComponent>;
}
