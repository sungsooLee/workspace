import LoginPage from '@/pages/auth/Login';
import { FetchBoundary } from '@/shared/components/error/FetchErrorBoundary';
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
            {/* <FetchBoundary> */}
            <LoginPage />
            {/* </FetchBoundary> */}
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
