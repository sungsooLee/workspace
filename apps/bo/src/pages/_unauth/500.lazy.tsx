import { ErrorComponent } from '@features/layout';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/_unauth/500')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ErrorComponent error={''}></ErrorComponent>;
}
