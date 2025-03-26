/* eslint-disable no-useless-catch */
import { createElement } from 'react';
import { ErrorComponent, redirect, RouteMatch } from '@tanstack/react-router';
import type { ParsedLocation } from '@tanstack/react-router';
import { isEmpty } from 'lodash';
import { ZodSchema } from 'zod';

import { authUserQueryKeys, ERROR } from '@learnway/config';
import type { AuthUser, PageRouteConfig } from '@learnway/config';
import { buildJodObject } from '@learnway/shared';

import type { PageMeta } from '../../../types';

const defaultPageRouteConfig: PageRouteConfig<PageMeta> = {
  authorization: true,
  meta: {
    title: '',
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
      return { ...context, state: location?.state };
    },
    loader: ({ location, context, params, search, preload, route, ...props }: any) => {
      if (preload || isEmpty(location.state)) {
        return;
      }
      if (routeConfig?.validateState) {
        const schema: ZodSchema = buildJodObject(routeConfig?.validateState);
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
    },
    errorComponent: ({ error }: any) => {
      console.log('errorComponent', error);
      // Render an error message
      return createElement(ErrorComponent, { error });
    },
    ...(routeConfig?.meta
      ? {
          staticData: {
            meta: {
              ...defaultPageRouteConfig.meta,
              ...routeConfig.meta,
            },
          },
        }
      : {}),
    staleTime: 0,
    onLeave: (match: any) => {
      // Routing시 동적으로 변경된 상태를 초기화
      match.context.setPageRouteState((state: any) => {
        return state?.pathname === match.pathname ? undefined : state;
      });
    },
    ...(routeConfig?.validateSearch
      ? {
          validateSearch: buildJodObject(routeConfig?.validateSearch),
        }
      : {}),
  };
}
