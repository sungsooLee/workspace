import * as React from 'react';
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ModalWrapper, useModalStore } from '@learnway/ui';
import { useGlobalRouterEvent } from '@learnway/hooks';
import { PageRouteContext } from '@learnway/shared';
import { useRenewalMenuStateFromRouting } from '@learnway/auth';

const NotFound = () => {
  return (
    <div>
      <h1>페이지를 찾을 수 없습니다</h1>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
};

export const Route = createRootRouteWithContext<PageRouteContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  const { closeAll } = useModalStore();

  useRenewalMenuStateFromRouting();

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
    </>
  );
}
