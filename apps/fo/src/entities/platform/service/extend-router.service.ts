import { useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';

import { usePageRouteState } from '../state/page-route.state';

export function useExtendRouter() {
  const router = useRouter();
  const [, setPageRouteState] = usePageRouteState();

  return {
    ...router,
    navigate: (options: any) => {
      const { state, ...rest } = options;
      if (options?.state) {
        setPageRouteState({ to: rest.to, state });
      }
      router.navigate(options);
    },
  };
}

export function useGlobalRouterEvent() {
  const router = useRouter();
  const [pageRouteState, setPageRouteState] = usePageRouteState();

  useEffect(() => {
    const unsubscribe = router.subscribe('onLoad', ({ fromLocation, toLocation, ...p }: any) => {
      if (!pageRouteState) {
        return;
      }
      if (fromLocation?.pathname === pageRouteState?.to) {
        console.log('init pageRouteState', fromLocation?.pathname, toLocation?.pathname, p);
        setPageRouteState(undefined);
      }
      return;
    });
    return () => {
      unsubscribe();
    };
  }, []);
}
