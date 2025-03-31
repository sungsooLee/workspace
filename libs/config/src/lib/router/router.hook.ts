import { useEffect } from 'react';
import { useRouter, useLocation, useMatches } from '@tanstack/react-router';
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
        if (toLocation?.state?.meta) {
          // 라우팅 시 static meta정보를 동적으로 변경하고자 하는 경우 state에 meta를 함께 전달
          setPageRouteState({ pathname: toLocation.pathname, meta: toLocation?.state?.meta });
        }

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
  const matches = useMatches();

  const location = useLocation();

  return useCreation(() => {
    const route = last(matches);
    if (!route) {
      return {
        state: undefined,
        params: undefined,
        search: undefined,
        meta: undefined,
      };
    }
    const params = route.params;
    const search = route.search;
    const meta = (route.staticData as any)?.meta;

    return {
      state: location.state,
      params,
      search,
      meta: { ...meta, ...pageRouteState?.meta },
    };
  }, [matches, pageRouteState?.meta]);
}
