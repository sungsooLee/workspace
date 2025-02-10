import * as React from 'react';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ModalWrapper } from '@learnway/ui';
import { useRenewalMenuStateFromRouting } from '../widgets/layout';
import { useLoginTimeout } from '../widgets/layout/service/loginTimeout.hooks';

const NotFound = () => {
  return (
    <div>
      <h1>페이지를 찾을 수 없습니다</h1>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
  beforeLoad: async ({ location }) => {
    if (location.state) {
      console.log(location.state);
      return;
    }
    console.log('토큰 체크 API 발송하는게 맞는지?');
  },
});

function RootComponent() {
  useRenewalMenuStateFromRouting();
  const { remainingTime } = useLoginTimeout();

  return (
    <>
      {remainingTime}
      <Outlet />
      <ModalWrapper />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
