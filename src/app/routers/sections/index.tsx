import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { myRoutes } from './my';
import ZustandAuthGuard from '@/app/auth/guard/zustandAuthGuard';
import { GlobalBoundary } from '@/shared/components/error/GlobalBoundary';
import { sampleRoutes } from './sample';
import Layout from '@/app/layout/layout';

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
    children: [...mainRoutes, ...myRoutes, ...sampleRoutes],
  },
  { path: '*', element: <>NOT FOUND</> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
