import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ModalWrapper } from '@learnway/ui';
import { useRenewalMenuStateFromRouting } from '../widgets/layout';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    // development 환경에서 /fo로 리다이렉트
    if (process.env.NODE_ENV === 'development' && !window.location.pathname.startsWith('/fo')) {
      window.location.href = '/fo' + window.location.pathname;
      return null;
    }
    return <div>Page not found</div>;
  },
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
