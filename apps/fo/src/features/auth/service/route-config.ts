import { createElement } from 'react';
import { ErrorComponent, redirect } from '@tanstack/react-router';
import type { ParsedLocation } from '@tanstack/react-router';

import { authUserQueryKeys } from '@learnway/config';
import type { AuthUser } from '@learnway/config';

import { PageMeta } from '../../../types';

const defaultPageMeta: PageMeta = {
  mobile: { showFooter: false },
};

export function authConfig() {
  return {
    /**
     * 로그인 사용자의 접근 권한 확인,
     * location.path에 대한 접근 권한 여부 확인 ('/'(home)화면 제외)
     */
    beforeLoad: async ({ location, context }: { location: ParsedLocation; context: any }) => {
      const queryClient = context.queryClient;
      const authUser = queryClient.getQueryData(authUserQueryKeys.authUser) as AuthUser;
      console.log('authUser', authUser);
      if (location.pathname === '/' || !authUser?.menus) {
        if (authUser === undefined) {
          throw redirect({ to: '/login', search: { redirect: location.pathname } });
        }
        return true;
      }

      const unauthScreen = authUser?.menus.some((menu: any) => menu.path === location.pathname);
      if (!unauthScreen) {
        console.log('Error 화면 접근 권한 없음');
        //throw redirect({ to: '/' });
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

export function metaConfig(pageMeta?: PageMeta) {
  return {
    beforeLoad: ({ context }: any) => {
      if (pageMeta) {
        context.setPageMeta({ ...defaultPageMeta, ...pageMeta });
      } else {
        context.setPageMeta(defaultPageMeta);
      }
    },
  };
}
