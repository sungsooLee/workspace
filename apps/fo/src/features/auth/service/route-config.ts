/* eslint-disable no-useless-catch */
import { createElement } from 'react';
import { ErrorComponent, redirect } from '@tanstack/react-router';
import type { ParsedLocation } from '@tanstack/react-router';
import { isEmpty } from 'lodash';
import { ZodSchema } from 'zod';

import { authUserQueryKeys, ERROR } from '@learnway/config';
import type { AuthUser, PageRouteConfig } from '@learnway/config';
import { buildJodObject } from '@learnway/shared';

import type { PageMeta } from '../../../types';

// Default Routing config
const defaultPageRouteConfig: PageRouteConfig<PageMeta> = {
  authorization: true,
  meta: {
    mobile: {
      container: { showHeader: false },
      showHeader: false,
      showFooter: false,
      showMainFooter: false,
    },
  },
};

// 사용자의 권한 여부를 확인
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

// framework 레벨에 Routing 관련 필요한 정의를 공통으로 페이지별 설정에 맞게 정의
export function pageRouteConfig(routeConfig?: PageRouteConfig<PageMeta>) {
  return {
    beforeLoad: ({ location, context, params, search, preload, route }: any) => {
      // 인증 정보 확인
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
      // 기타 validation
      if (preload || isEmpty(location.state)) {
        return;
      }

      // currentMatch route instance 추출
      /*
      context.setPageRouteState((state: any) => {
        if (!state) {
          console.log('beforeLoad setPageRouteState init', state);
          return {
            pathname: location.pathname,
            meta: route.options.staticData?.meta,
            route: route,
          };
        }
        console.log('beforeLoad setPageRouteState', state);
        if (state?.pathname === location.pathname && route) {
          console.log('matched', location.pathname, 'update route');
          state.route = route;
        }
        return state;
      });
*/
      // state validation 처리
      if (routeConfig?.validateState) {
        const schema: ZodSchema = buildJodObject(routeConfig?.validateState);
        try {
          schema.parse(location?.state);
        } catch (e) {
          console.log('Error routeConfig.validateState', location?.state);
          throw new Error(String(e));
        }
      }

      // params validation 처리
      if (routeConfig?.validateParam) {
        const schema: ZodSchema = buildJodObject(routeConfig?.validateParam);
        try {
          schema.parse(params);
        } catch (e) {
          console.log('Error routeConfig.validateParam', params);
          throw new Error(String(e));
        }
      }
    },
    errorComponent: ({ error }: any) => {
      // 공통 예외 처리
      console.log('errorComponent', error);
      // Render an error message
      return createElement(ErrorComponent, { error });
    },
    // PageMeta 는 staticData 에 정의
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
    // query string validation 처리, tanstack router의 RouteOption을 그대로 사용(for 타입 추론)
    ...(routeConfig?.validateSearch
      ? {
          validateSearch: buildJodObject(routeConfig?.validateSearch),
        }
      : {}),
  };
}
