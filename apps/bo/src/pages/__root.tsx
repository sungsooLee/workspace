import { useEffect, Suspense, lazy } from 'react';
import { Outlet, createRootRouteWithContext, useRouter } from '@tanstack/react-router';

import { ModalWrapper, ToastWrapper, useModalStore } from '@learnway/ui';
import { useGlobalRouterEvent } from '@learnway/hooks';
import { setupErrorToastListener } from '@learnway/shared';
import { MinWidthRequired } from '../widgets/layout/ui/min-width-required';
import { useBreakpointModalClose } from '../shared/lib/breakpoint-modal.hook';
import { NotFound } from '@features/layout';
import { useFetchAuthUser, useRenewalMenuStateFromRouting } from '@learnway/auth/entities';
import { PageRouteContext } from '@learnway/shared';
import { ServerStatus } from '../shared/ui/temp-server-status/server-status';

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
  const { data: authUser } = useFetchAuthUser();
  const router = useRouter();
  const isUnderBreakpoint = useBreakpointModalClose(closeAll, 1000);

  useRenewalMenuStateFromRouting();
  useGlobalRouterEvent({
    onBeforeLoad: () => {
      closeAll();
    },
  });

  useEffect(() => {
    const unsubscribe = setupErrorToastListener();

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return unsubscribe;
  }, []);

  return (
    <>
      <div style={{ display: isUnderBreakpoint ? 'none' : 'block' }}>
        <Outlet />
      </div>
      {isUnderBreakpoint && <MinWidthRequired />}
      <ModalWrapper />
      <ToastWrapper />
      {(import.meta.env.VITE_APP_ENV === 'local' || import.meta.env.VITE_APP_ENV === 'dev') && (
        <Suspense fallback={null}>
          <ServerStatus />
          <ReactQueryDevtools />
          <TanStackRouterDevtools />
        </Suspense>
      )}
    </>
  );
}
