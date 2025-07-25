import { lazy, Suspense } from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import { ModalWrapper, ToastWrapper, useModalStore } from '@learnway/ui';
import { useCodeStoreShare, useGlobalRouterEvent } from '@learnway/hooks';
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

  // Routing 상태 변경 시 Active menu depth 상태 정보 갱신
  useRenewalMenuStateFromRouting();

  // 공통코드 스토어 탭간 동기화 처리
  useCodeStoreShare();
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
      <ToastWrapper />
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
