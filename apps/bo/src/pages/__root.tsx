import { useEffect } from 'react';
import { Outlet, createRootRouteWithContext, Link, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ModalWrapper, ToastWrapper, useModalStore } from '@learnway/ui';
import { useGlobalRouterEvent } from '@learnway/hooks';
import { useRenewalMenuStateFromRouting, useFetchAuthUser } from '@learnway/auth';
import { setupErrorToastListener } from '@learnway/shared';

const NotFound = () => {
  return (
    <div>
      <h1>페이지를 찾을 수 없습니다</h1>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
};

interface RouterContext {
  setPageRouteState?: any;
  queryClient?: any;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  const { closeAll } = useModalStore();
  const { data: authUser } = useFetchAuthUser();
  const router = useRouter();

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
      <Outlet />
      <ModalWrapper />
      <ToastWrapper />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </>
  );
}
