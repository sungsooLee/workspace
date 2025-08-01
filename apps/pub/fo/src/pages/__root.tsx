import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { ModalWrapper } from '@learnway/ui/modal';
import { ToastWrapper } from '@learnway/ui/toast';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <ModalWrapper />
      <ToastWrapper />
    </>
  );
}
