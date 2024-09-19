import LoginPage from '@/pages/auth/login';
import { FetchBoundary } from '@/shared/components/error/FetchErrorBoundary';
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
          <FetchBoundary>
            <LoginPage />
          </FetchBoundary>
        </>
      ),
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [auth],
  },
];
