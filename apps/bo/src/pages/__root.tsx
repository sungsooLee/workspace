import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { ModalWrapper, ToastWrapper } from '@learnway/ui';
import { useGlobalRouterEvent } from '@learnway/config';

import { useRenewalMenuStateFromRouting } from '../widgets/layout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  useRenewalMenuStateFromRouting();
  useGlobalRouterEvent();

  return (
    <>
      <Outlet />
      <ModalWrapper />
      <ToastWrapper />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
