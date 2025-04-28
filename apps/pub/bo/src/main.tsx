import { QueryClientProvider } from '@tanstack/react-query';
import { queryConfig } from '@learnway/config';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { appConfig } from '@learnway/config';

import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  basepath: '/pb-bo',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

appConfig.init({});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryConfig.getQueryClient()}>
<RouterProvider router={router} />
  </QueryClientProvider>
);
