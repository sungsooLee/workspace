// import { Navigate, ScrollRestoration, useRoutes } from 'react-router-dom';
// import { authRoutes } from './auth';
// import { mainRoutes } from './main';
// import { lazy } from 'react';
// import { knowledgeRoutes } from './knowledge';
// import { myRoutes } from './my';
// import Layout from '@/app/layout/Layout';
// import ZustandAuthGuard from '@/app/auth/guard/zustandAuthGuard';
// import ErrorPage from '@/pages/error/ErrorPage';

// const Page404 = lazy(() => import('@/pages/error/404'));
// export default function Router() {
//   return useRoutes([
//     ...authRoutes,
//     {
//       path: '/',
//       element: (
//         <ZustandAuthGuard>
//           <Layout />
//         </ZustandAuthGuard>
//       ),
//       children: [...mainRoutes, ...myRoutes, ...knowledgeRoutes],
//     },
//     { path: '/error', element: <ErrorPage /> },
//     { path: '404', element: <Page404 /> },
//     { path: '*', element: <Navigate to='/404' replace /> },
//   ]);
// }

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';
import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { knowledgeRoutes } from './knowledge';
import { myRoutes } from './my';
import Layout from '@/app/layout/Layout';
import ZustandAuthGuard from '@/app/auth/guard/zustandAuthGuard';
import ErrorPage from '@/pages/error/ErrorPage';
import { GlobalBoundary } from '@/shared/components/error/GlobalBoundary';

// 라우터 설정
const router = createBrowserRouter([
  ...authRoutes,
  {
    path: '/',
    element: (
      <GlobalBoundary>
        <ZustandAuthGuard>
          <Layout />
        </ZustandAuthGuard>
      </GlobalBoundary>
    ),
    children: [...mainRoutes, ...myRoutes, ...knowledgeRoutes],
  },
  // { path: '/error', element: <ErrorPage /> },
  // { path: '404', element: <Page404 /> },
  { path: '*', element: <>NOT FOUND</> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
