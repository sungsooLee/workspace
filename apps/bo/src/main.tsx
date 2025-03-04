import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { QueryConfig } from '@learnway/config';
import '@learnway/config/style/font.css';

import { AppConfigProvider } from './app/app-config-provider';
import { routeTree } from './routeTree.gen';

const isLocal = process.env.NODE_ENV === 'local';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  basepath: import.meta.env.VITE_BO_BASE_PATH,
  context: {
    queryClient: undefined,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

QueryConfig.init({});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={QueryConfig.getQueryClient()}>
    <AppConfigProvider>
      <RouterProvider router={router} context={{ queryClient: QueryConfig.getQueryClient() }} />
    </AppConfigProvider>
  </QueryClientProvider>,
);
