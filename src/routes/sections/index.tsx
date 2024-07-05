import { Navigate, ScrollRestoration, useRoutes } from 'react-router-dom';
// import Header from '../../components/header';
import { authRoutes } from './auth';
import AuthGuard from '@/auth/guard/auth-guard';
import { mainRoutes } from './main';
import { lazy } from 'react';
import { knowledgeRoutes } from './knowledge';
import { myRoutes } from './my';
import HAELayout from '@/components/layout/layout';

const Page404 = lazy(() => import('@/pages/error/404'));
export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <>
          <AuthGuard>
            <Navigate to={'/board'} replace />
          </AuthGuard>
        </>
      ),
    },
    ...authRoutes,
    {
      path: '/',
      element: (
        <AuthGuard>
          <HAELayout />
        </AuthGuard>
      ),
      children: [...mainRoutes, ...myRoutes, ...knowledgeRoutes],
    },
    { path: '404', element: <Page404 /> },
    { path: '*', element: <Navigate to='/404' replace /> },
  ]);
}
