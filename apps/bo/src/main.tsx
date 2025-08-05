import { QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import * as ReactDOM from 'react-dom/client';

import { appConfig, queryConfig } from '@learnway/config';
import '@learnway/config/style/font.css';
import { usePageRouteState } from '@learnway/hooks';

import { GlobalLoadingIndicator } from '@shared/ui';
import { AppConfigProvider } from './app/app-config-provider';
import { routeTree } from './routeTree.gen';

import { registerToastHandler } from '@learnway/shared';
import { showToast } from '@learnway/ui/stores';
import type { PageMeta } from '@shared/types/page-meta';

const isLocal = process.env.NODE_ENV === 'local';

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultPreloadDelay: 100,
  basepath: import.meta.env.VITE_BO_BASE_PATH,
  context: {
    setPageRouteState: undefined,
    queryClient: undefined,
  },
  defaultErrorComponent: ({ error }) => {
    // Dynamic import 에러 처리
    if (
      error.message.includes('Failed to fetch dynamically imported module') ||
      error.message.includes('Loading chunk')
    ) {
      window.location.reload();
    }
    return <div>Error: {error.message}</div>;
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
  interface HistoryState {
    [key: string]: any;
    //    params?: any;
  }
  interface StaticDataRouteOption {
    meta?: PageMeta;
  }
}

appConfig.init({});

registerToastHandler((config: any) => {
  showToast({
    title: config.title,
    description: config.description,
    type: config.type,
    // duration: config.duration
  });
});

function App() {
  const { setPageRouteState } = usePageRouteState();
  return (
    <QueryClientProvider client={queryConfig.getQueryClient()}>
      <AppConfigProvider>
        <GlobalLoadingIndicator>
          <RouterProvider
            router={router}
            context={{ queryClient: queryConfig.getQueryClient(), setPageRouteState }}
          />
        </GlobalLoadingIndicator>
      </AppConfigProvider>
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
