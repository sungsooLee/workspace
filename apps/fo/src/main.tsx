import * as ReactDOM from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { isMobile } from 'react-device-detect';

import { appConfig, queryConfig, usePageRouteState } from '@learnway/config';
import '@learnway/config/style/font.css';

import { AppConfigProvider } from './app/app-config-provider';
import { routeTree } from './routeTree.gen';

import type { PageMeta } from './types';

const isLocal = process.env.NODE_ENV === 'local';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  basepath: import.meta.env.VITE_FO_BASE_PATH,
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

if (isMobile) {
  const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;
  body.classList.add('mobile');
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
