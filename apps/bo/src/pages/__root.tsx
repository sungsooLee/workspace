import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ModalWrapper } from '@learnway/ui';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <ModalWrapper />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
