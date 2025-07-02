import { lazy, Suspense } from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import { ModalWrapper, useModalStore } from '@learnway/ui';
import { useGlobalRouterEvent } from '@learnway/hooks';
import { PageRouteContext } from '@learnway/shared';
import { useRenewalMenuStateFromRouting } from '@learnway/auth/entities';
// import { useSessionTimout } from '@learnway/auth/features';
import { NotFound } from '@features/layout';

const TanStackRouterDevtools = lazy(() =>
  import.meta.env.VITE_APP_ENV === 'local'
    ? import('@tanstack/router-devtools').then((res) => ({ default: res.TanStackRouterDevtools }))
    : Promise.resolve({ default: () => null }),
);

const ReactQueryDevtools = lazy(() =>
  import.meta.env.VITE_APP_ENV === 'local'
    ? import('@tanstack/react-query-devtools').then((res) => ({ default: res.ReactQueryDevtools }))
    : Promise.resolve({ default: () => null }),
);

export const Route = createRootRouteWithContext<PageRouteContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  const { closeAll } = useModalStore();

  useRenewalMenuStateFromRouting();
  // useSessionTimout();

  // router event subscribe
  useGlobalRouterEvent({
    onBeforeLoad: () => {
      closeAll();
    },
  });

  return (
    <>
      <Outlet />
      <ModalWrapper />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {import.meta.env.VITE_APP_ENV === 'local' && (
        <Suspense fallback={null}>
          <ReactQueryDevtools />
          <TanStackRouterDevtools />
        </Suspense>
      )}
    </>
  );
}
