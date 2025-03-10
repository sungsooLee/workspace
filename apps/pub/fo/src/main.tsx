import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

import { appConfig } from '@learnway/config';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  basepath: '/pb-fo',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

appConfig.init({});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
