import { useEffect } from 'react';
import { Outlet, createRootRouteWithContext, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ModalWrapper, ToastWrapper, useModalStore } from '@learnway/ui';
import { useGlobalRouterEvent } from '@learnway/hooks';
import { setupErrorToastListener } from '@learnway/shared';
// import { useWindowSize } from 'react-use';
import { MinWidthRequired } from '../widgets/layout/ui/min-width-required';
import { useBreakpointModalClose } from '../shared/lib/breakpoint-modal.hook';
import { NotFound } from '@features/layout';
import { useFetchAuthUser, useRenewalMenuStateFromRouting } from '@learnway/auth/entities';

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
      <ReactQueryDevtools />
    </>
  );
}
