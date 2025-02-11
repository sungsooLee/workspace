import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { ReactQueryConfigProvider } from '@learnway/config';
import '@learnway/config/style/font.css';

import { fetchCodes } from './entities/system';

import { AppConfigProvider } from './app/app-config-provider';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  basepath: '/fo',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <ReactQueryConfigProvider>
      <AppConfigProvider>
        <RouterProvider router={router} />
      </AppConfigProvider>
    </ReactQueryConfigProvider>
  </StrictMode>,
);
