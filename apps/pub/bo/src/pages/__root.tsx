import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { ModalWrapper } from '@learnway/ui/modal';
import { useRenewalMenuStateFromRouting } from '../widgets/layout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useRenewalMenuStateFromRouting();
  return (
    <>
      <Outlet />
      <ModalWrapper />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
