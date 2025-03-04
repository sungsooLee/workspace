import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter, createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { QueryConfig } from '@learnway/config';
import '@learnway/config/style/font.css';

import { AppConfigProvider } from './app/app-config-provider';
import { routeTree } from './routeTree.gen';

import { usePageMetaState } from './entities/platform';

const isLocal = process.env.NODE_ENV === 'local';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  basepath: import.meta.env.VITE_FO_BASE_PATH,
  context: {
    setPageMeta: undefined,
    queryClient: undefined,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

QueryConfig.init({});

function App() {
  const [, setPageMeta] = usePageMetaState();
  // Inject the returned value from the hook into the router context
  return (
    <QueryClientProvider client={QueryConfig.getQueryClient()}>
      <AppConfigProvider>
        <RouterProvider
          router={router}
          context={{ queryClient: QueryConfig.getQueryClient(), setPageMeta }}
        />
      </AppConfigProvider>
    </QueryClientProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
