/* eslint-disable no-useless-catch */
import { createElement } from 'react';
import { ErrorComponent, redirect } from '@tanstack/react-router';
import type { ParsedLocation } from '@tanstack/react-router';
import { isFunction, isEmpty } from 'lodash';
import { ZodSchema } from 'zod';

import { authUserQueryKeys, ERROR } from '@learnway/config';
import type { AuthUser, PageRouteConfig } from '@learnway/config';

import type { PageMeta } from '../../../types';

const defaultPageRouteConfig: PageRouteConfig<PageMeta> = {
  authorization: true,
  meta: {
    mobile: { showFooter: false },
  },
};

function authorization({ location, context }: { location: ParsedLocation; context: any }) {
  const queryClient = context.queryClient;
  const authUser = queryClient.getQueryData(authUserQueryKeys.authUser) as AuthUser;

  if (location.pathname === '/' || !authUser?.menus) {
    if (authUser === undefined) {
      throw ERROR.AUTHORIZATION;
    }
    return;
  }

  const unauthScreen = authUser?.menus.some((menu: any) => menu.path === location.pathname);
  if (!unauthScreen) {
    throw ERROR.PAGE_ACCESS_RIGHTS;
  }

  //router.history.push(search.redirect)
}

export function pageRouteConfig(routeConfig?: PageRouteConfig<PageMeta>) {
  return {
    beforeLoad: ({ location, context, params, search, preload }: any) => {
      if (routeConfig?.authorization) {
        try {
          authorization({ location, context });
        } catch (e) {
          if (e === ERROR.PAGE_ACCESS_RIGHTS) {
            throw redirect({ to: '/' });
          } else {
            throw redirect({ to: '/login', search: { redirect: location.pathname } });
          }
        }
      }

      // preload 일 때 pageMeta 상태 변경 예외 처리
      if (preload || isEmpty(location.state)) {
        console.log('loader return state is empty');
        return;
      }
      if (routeConfig?.meta) {
        context.setPageMeta({
          ...defaultPageRouteConfig.meta,
          ...routeConfig.meta,
          ...location?.state?.meta,
        });
      } else {
        context.setPageMeta({ ...defaultPageRouteConfig.meta, ...location?.state?.meta });
      }
      if (routeConfig?.validateState) {
        let schema: ZodSchema;
        if (isFunction(routeConfig?.validateState)) {
          schema = routeConfig?.validateState(location?.state);
        } else {
          schema = routeConfig?.validateState;
        }
        try {
          schema.parse(location?.state);
        } catch (e) {
          console.log('routeConfig.validateState', location?.state);
          throw new Error(String(e));
        }
      }
      if (routeConfig?.validate) {
        try {
          routeConfig.validate({ params, search, state: location?.state });
        } catch (e) {
          throw new Error(String(e));
        }
      }
      console.log('location', location);
      return { ...context, state: location?.state };
    },
    //loader: ({ location, context, params, search, preload }: any) => {},
    errorComponent: ({ error }: any) => {
      console.log('errorComponent', error);
      // Render an error message
      return createElement(ErrorComponent, { error });
    },
    ...(routeConfig?.meta ? { staticData: { meta: routeConfig?.meta } } : {}),
    staleTime: 0,
  };
}
