import { useEffect } from 'react';
import { useRouter, useLocation, useMatches, Route } from '@tanstack/react-router';
import { has, last } from 'lodash';
import { useCreation } from 'ahooks';

import { usePageRouteState } from './page-route.state';

export function useGlobalRouterEvent() {
  const router = useRouter();
  const [pageRouteState, setPageRouteState] = usePageRouteState();

  useEffect(() => {
    const unsubscribe = router.subscribe(
      'onBeforeLoad',
      ({ fromLocation, toLocation, ...p }: any) => {
        console.log('onBeforeLoad', toLocation.pathname);
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

export function useCurrentRoute(route?: any) {
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
