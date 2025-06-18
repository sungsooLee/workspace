import * as ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryConfig, appConfig } from '@learnway/config';
import { usePageRouteState } from '@learnway/hooks';
import '@learnway/config/style/font.css';

import { AppConfigProvider } from './app/app-config-provider';
import { routeTree } from './routeTree.gen';
import { GlobalLoadingIndicator } from './components/global-loading-indicator';

import type { PageMeta } from './types';
import { registerToastHandler } from '@learnway/shared';
import { showToast } from '@learnway/ui';

const isLocal = process.env.NODE_ENV === 'local';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  basepath: import.meta.env.VITE_BO_BASE_PATH,
  context: {
    setPageRouteState: undefined,
    queryClient: undefined,
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
    // duration: config.duration,
  });
});

function App() {
  const [, setPageRouteState] = usePageRouteState();
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
