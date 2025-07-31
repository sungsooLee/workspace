import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

import { NotFound } from '@features/layout';
import { useRenewalMenuStateFromRouting } from '@learnway/auth/entities';
import { useCodeStoreShare, useGlobalRouterEvent } from '@learnway/hooks';
import { PageRouteContext } from '@learnway/shared';
import { ModalWrapper } from '@learnway/ui/modal';
import { useModalStore } from '@learnway/ui/stores/useModalStore';
import { ToastWrapper } from '@learnway/ui/toast';

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
  const { closeAllModal } = useModalStore();

  // Routing 상태 변경 시 Active menu depth 상태 정보 갱신
  useRenewalMenuStateFromRouting();

  // 공통코드 스토어 탭간 동기화 처리
  useCodeStoreShare();
  // useSessionTimout();

  // router event subscribe
  useGlobalRouterEvent({
    onBeforeLoad: () => {
      closeAllModal();
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
          <TanStackRouterDevtools position="bottom-right" />
        </Suspense>
      )}
    </>
  );
}
