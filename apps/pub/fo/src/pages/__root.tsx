import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ModalWrapper, ToastWrapper } from '@learnway/ui';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <ModalWrapper />
      <ToastWrapper />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
