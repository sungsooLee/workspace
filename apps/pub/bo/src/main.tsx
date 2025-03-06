import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
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
// dayjs
dayjs.extend(duration);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
