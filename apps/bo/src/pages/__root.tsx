import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { ModalWrapper, ToastWrapper } from '@learnway/ui';

import type { Menu } from '../types';

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
      <ToastWrapper />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
