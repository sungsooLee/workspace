import { Navigate, useRoutes } from 'react-router-dom';
import { authRoutes } from './auth';
import AuthGuard from '@/auth/guard/auth-guard';
import { mainRoutes } from './main';
import { lazy } from 'react';
import { knowledgeRoutes } from './knowledge';
import { myRoutes } from './my';
import Layout from '@/components/layout/layout';

const Page404 = lazy(() => import('@/pages/error/404'));
export default function Router() {
  return useRoutes([
    ...authRoutes,
    {
      path: '/',
      element: (
        <AuthGuard>
          <Layout />
        </AuthGuard>
      ),
      children: [...mainRoutes, ...myRoutes, ...knowledgeRoutes],
    },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to='/404' replace /> },
  ]);
}
