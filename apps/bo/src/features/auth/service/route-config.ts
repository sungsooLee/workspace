import { createElement } from 'react';
import { ErrorComponent, redirect } from '@tanstack/react-router';
import type { ParsedLocation } from '@tanstack/react-router';

import { AuthUser, authUserQueryKeys } from '@learnway/config';

export function authConfig() {
  return {
    /**
     * 로그인 사용자의 접근 권한 확인,
     * location.path에 대한 접근 권한 여부 확인 ('/'(home)화면 제외)
     */
    beforeLoad: async ({ location, context }: { location: ParsedLocation; context: any }) => {
      const queryClient = context.queryClient;
      const authUser = queryClient.getQueryData(authUserQueryKeys.authUser) as AuthUser;

      if (location.pathname === '/' || !authUser?.menus) {
        if (authUser === undefined) {
          throw redirect({ to: '/login' });
        }
        return true;
      }

      const unauthScreen = authUser?.menus.some((menu: any) => menu.path === location.pathname);
      if (!unauthScreen) {
        console.log('Error 화면 접근 권한 없음');
        throw redirect({ to: '/' });
      }

      //router.history.push(search.redirect)
    },
    errorComponent: ({ error }: any) => {
      console.log('errorComponent', error);
      // Render an error message
      return createElement(ErrorComponent, { error });
    },
    staleTime: 0,
  };
}
