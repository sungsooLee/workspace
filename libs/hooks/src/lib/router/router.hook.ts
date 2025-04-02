import { useEffect } from 'react';
import { useRouter, useLocation, useMatches, Route } from '@tanstack/react-router';
import { isFunction, last } from 'lodash';
import { useCreation } from 'ahooks';

import { RouteEventCallback, CurrentRoute } from '@learnway/shared';

import { usePageRouteState } from './page-route.state';

export function useGlobalRouterEvent(callback?: RouteEventCallback) {
  const router = useRouter();
  const [pageRouteState, setPageRouteState] = usePageRouteState();

  useEffect(() => {
    const unsubscribe = router.subscribe(
      'onBeforeLoad',
      ({ fromLocation, toLocation, ...p }: any) => {
        console.log('onBeforeLoad', toLocation.pathname);

        isFunction(callback?.onBeforeLoad) && callback?.onBeforeLoad();

        setPageRouteState({
          pathname: toLocation.pathname,
          meta: toLocation?.state?.meta,
          route: undefined,
        });
        return;
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);
}

export function useCurrentRoute<T = any>(route?: any): CurrentRoute<T> {
  const [pageRouteState] = usePageRouteState();
  const location = useLocation();
  const matches = useMatches();

  if (!route) {
    const r = last(matches);
    return {
      state: location.state,
      params: r?.params,
      search: r?.search,
      meta: (r?.staticData as any).meta,
    };
  }

  return {
    state: location.state,
    params: route.useParams(),
    search: route.useSearch(),
    meta: { ...pageRouteState?.meta },
  };
}
