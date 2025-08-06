import { createElement } from 'react';
// import { ErrorComponent, redirect } from '@tanstack/react-router';
import type { ParsedLocation } from '@tanstack/react-router';
import { redirect } from '@tanstack/react-router';
import { isEmpty } from 'lodash-es';
import { ZodSchema } from 'zod';

import { authUserQueryKeys, menuQueryOptions, mutateOptions } from '@learnway/auth/entities';

import type { AuthUser, Menu } from '@learnway/auth/types';
import { ERROR, tokenService } from '@learnway/config';
import type { PageRouteConfig } from '@learnway/shared';
import { buildJodObject, convertHierarchyToList, dateDiff } from '@learnway/shared';

import { ErrorComponent } from '@features/layout';
import type { PageMeta } from '@shared/types/page-meta';
import { QueryClient } from '@tanstack/react-query';

// Default Routing config
const defaultPageRouteConfig: PageRouteConfig<PageMeta> = {
  authorization: true,
  meta: {
    title: '',
  },
};

/**
 * @description 페이지 URL 체크
 * @param menu
 * @param location
 */
export const accessPageCheck = (menu: Menu[], location: ParsedLocation) => {
  console.log(
    '### 3. import.meta.env.VITE_PAGE_ACCESS_CHECK',
    import.meta.env.VITE_PAGE_ACCESS_CHECK,
  );
  if (import.meta.env.VITE_PAGE_ACCESS_CHECK === 'false') return;

  const isAccessMenu = menu.some((menu: any) => menu.path === location.pathname);

  console.log('### 3. 메뉴 체크 - 접근가능 :', isAccessMenu);
  if (!isAccessMenu) {
    throw ERROR.PAGE_ACCESS_DENIED;
  }
  return;
};

/**
 * @description JWT 토큰 디코딩
 * @param token
 * @returns token
 */
export const decodeJwt = (token: string | null) => {
  if (!token) {
    console.error('### Invalid token:');
    return null;
  }
  // // console.log('### Encode Token : ', token);

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

/**
 * 사용자의 권한 여부를 확인
 */
async function authorization({ location, context }: { location: ParsedLocation; context: any }) {
  // 1. 토큰 없으면 로그인 페이지
  // 2. 토큰이 있는데 passwordExpireDate 체크하여 비밀번호 변경으로 이동
  // 3. 토큰/인증정보 있는데 메뉴 접근권한이 없으면 권한 없음 페이지로 이동

  // 1번 체크
  if (tokenService.accessToken === null) {
    throw ERROR.AUTHORIZATION;
  }

  try {
    const token = decodeJwt(tokenService.accessToken);
    console.log('### 1. 토큰 token', token);
    // const refresh = decodeJwt(tokenService.refreshToken);

    // 2번 체크
    // 패스워드 만료 시 패스워드 변경 페이지로 라우팅
    const diff = dateDiff(token!.passwordExpireDate, new Date(), 'd');
    console.log('### 2. 패스워드 passwordExpireDate ', diff);

    if (location.pathname !== '/change-password' && diff !== undefined && 0 >= diff) {
      throw ERROR.PASSWORD_EXPIRE;
    }
  } catch (e) {
    console.error('### Token ERROR:', e);
  }

  const queryClient = context.queryClient as QueryClient;
  const authUserQuery = queryClient.getQueryData(authUserQueryKeys.authUser) as AuthUser;

  console.log('### auth authUserQuery ', authUserQuery);

  // 3번 체크
  if (authUserQuery) {
    if (location.pathname === '/') return;
    // 메뉴별 접근 권한 체크
    accessPageCheck(authUserQuery?.menus, location);
  } else {
    const authUserFetch = (await mutateOptions.reissue().mutationFn()) as AuthUser;
    const menus = await queryClient.fetchQuery(
      menuQueryOptions.all(
        authUserFetch?.activeTenant?.tenantId,
        authUserFetch?.activeRole?.roleId,
      ),
    );
    const hierachyMenu = convertHierarchyToList(menus);
    console.log('### auth authUserFetch', authUserFetch);

    if (authUserFetch && menus) {
      authUserFetch.menus = hierachyMenu;
      queryClient.setQueryData(authUserQueryKeys.authUser, authUserFetch);
    }
    if (location.pathname === '/') return;

    // 메뉴별 접근 권한 체크
    accessPageCheck(authUserFetch?.menus, location);
  }

  //router.history.push(search.redirect)
}

// framework 레벨에 Routing 관련 필요한 정의를 공통으로 페이지별 설정에 맞게 정의
export function pageRouteConfig(routeConfig?: PageRouteConfig<PageMeta>) {
  return {
    // 페이지 로딩 전 체크
    beforeLoad: async ({ location, context, params, search, preload, route }: any) => {
      console.log('### beforeLoad start');
      // 환경변수로 인증 체크 비활성화 확인 (테스트 용)
      const isAuthDisabled = import.meta.env.VITE_DISABLE_AUTH === 'true';

      // 인증 정보 확인 (환경변수가 true가 아니고, routeConfig에서 authorization이 true인 경우만)
      if (!isAuthDisabled && routeConfig?.authorization) {
        try {
          await authorization({ location, context });
        } catch (e) {
          console.error('### beforeLoad catch', e);
          if (e === ERROR.PAGE_ACCESS_RIGHTS) {
            console.error('### 루트로 이동 / ');
            throw redirect({ to: '/' });
          } else if (e === ERROR.PASSWORD_EXPIRE) {
            console.error('### 패스워드 변경 이동');
            throw redirect({ to: '/change-password' });
          } else if (e === ERROR.PAGE_ACCESS_DENIED) {
            console.error('### 권한없음 이동');
            throw redirect({ to: '/access-denied' });
          } else {
            console.error('### 로그인 이동');
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
          // console.log('beforeLoad setPageRouteState init', state);
          return {
            pathname: location.pathname,
            meta: route.options.staticData?.meta,
            route: route };
        }
        // console.log('beforeLoad setPageRouteState', state);
        if (state?.pathname === location.pathname && route) {
          // console.log('matched', location.pathname, 'update route');
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
          // console.log('Error routeConfig.validateState', location?.state);
          throw new Error(String(e));
        }
      }

      // params validation 처리
      if (routeConfig?.validateParam) {
        const schema: ZodSchema = buildJodObject(routeConfig?.validateParam);
        try {
          schema.parse(params);
        } catch (e) {
          // console.log('Error routeConfig.validateParam', params);
          throw new Error(String(e));
        }
      }
    },
    errorComponent: ({ error }: any) => {
      // 공통 예외 처리
      // console.log('errorComponent', error);
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
