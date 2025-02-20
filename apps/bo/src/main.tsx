import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { ReactQueryConfig } from '@learnway/config';
import '@learnway/config/style/font.css';

import { AppConfigProvider } from './app/app-config-provider';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient: undefined,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactQueryConfig.init({});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={ReactQueryConfig.getQueryClient()}>
    <AppConfigProvider>
      <RouterProvider
        router={router}
        context={{ queryClient: ReactQueryConfig.getQueryClient() }}
      />
    </AppConfigProvider>
  </QueryClientProvider>,
);
