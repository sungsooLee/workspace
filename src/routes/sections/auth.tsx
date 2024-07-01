import ErrorBoundary from '@/components/error/error-boundary';
import ErrorFallback from '@/components/error/error-fallback';
import LoginPage from '@/pages/auth/login';
import { Outlet } from 'react-router-dom';

const auth = {
  element: (
    <>
      <Outlet />
    </>
  ),
  children: [
    {
      path: 'login',
      element: (
        <> 
          <ErrorBoundary FallBack={ErrorFallback} onReset={() => {}}>
            <LoginPage />
          </ErrorBoundary>
        </>
      ),
    },
    { path: 'register', element: <>회원가입화면</> },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [auth],
  },
];
