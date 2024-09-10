// import LoginPage from '@/pages/auth/Login';
import LoginPage from '@/pages/auth/login';
import ErrorBoundary from '@/shared/components/error/errorBoundary';
import ErrorFallback from '@/shared/components/error/errorFallback';
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
