import * as ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryConfig, appConfig, usePageRouteState } from '@learnway/config';
import '@learnway/config/style/font.css';

import { AppConfigProvider } from './app/app-config-provider';
import { routeTree } from './routeTree.gen';

import type { PageMeta } from './types';

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

function App() {
  const [, setPageRouteState] = usePageRouteState();
  // Inject the returned value from the hook into the router context
  return (
    <QueryClientProvider client={queryConfig.getQueryClient()}>
      <AppConfigProvider>
        <RouterProvider
          router={router}
          context={{ queryClient: queryConfig.getQueryClient(), setPageRouteState }}
        />
      </AppConfigProvider>
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
