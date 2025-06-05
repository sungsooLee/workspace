import { useEffect } from 'react';
import { Outlet, createRootRouteWithContext, Link, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { cn } from '@learnway/shared';

import { Button, ModalWrapper, ToastWrapper, useModalStore } from '@learnway/ui';
import { useGlobalRouterEvent } from '@learnway/hooks';
import { useRenewalMenuStateFromRouting, useFetchAuthUser, useLoginTimer } from '@learnway/auth';
import { setupErrorToastListener } from '@learnway/shared';
// import { useWindowSize } from 'react-use';
import { MinWidthRequired } from '../widgets/layout/ui/min-width-required';
import { useBreakpointModalClose } from '../shared/lib/breakpoint-modal.hook';
import styles from '@learnway/styles/bo/assets/styles/modules/not-found.module.css';
import pageStyles from '@learnway/styles/bo/assets/styles/modules/page-container.module.css';

const NotFound = () => {
  return (
    <div className={cn(pageStyles.start, pageStyles.contents)}>
      <div className={pageStyles.inner}>
        <div className={cn(styles.start, 'not_found')}>
          <div className={styles.guide_wrap}>
            <div className={styles.empty_message}>
              <strong>{'404'}</strong>
              <p>{'NOT FOUND'}</p>
            </div>
            <p className={styles.text}>{'요청하신 페이지를 찾을 수 없습니다.'}</p>
            <div className={styles.btn_wrap}>
              <Link to={'/'}>
                <Button variant={'primary'} size={'lg'}>
                  {'홈'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
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
  const isUnderBreakpoint = useBreakpointModalClose(closeAll, 1000);

  // 로그아웃 처리 타이머
  useLoginTimer();
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

  if (isUnderBreakpoint) {
    return <MinWidthRequired />;
  }
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
