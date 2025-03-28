import { useEffect } from 'react';
import { useRouter, useLocation, useMatches, useRouterState } from '@tanstack/react-router';
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
        console.log('onBeforeLoad');
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

export function useCurrentRoute() {
  const [pageRouteState] = usePageRouteState();
  const location = useLocation();

  const route = pageRouteState?.route; //last(matches);
  const params = route.useParams();
  const search = route.useSearch();

  if (!route) {
    return {
      state: undefined,
      params: undefined,
      search: undefined,
      meta: undefined,
    };
  }

  return {
    state: location.state,
    params,
    search,
    meta: { ...route.options.staticData?.meta, ...pageRouteState?.meta },
  };
}
