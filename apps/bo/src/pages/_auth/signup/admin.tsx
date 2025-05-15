import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { pageRouteConfig } from '@features/auth';
import {
  AdminSignupAuth,
  AdminSignupForm,
  AdminSignupIdCheck,
  useSignupStore,
} from '@features/user/signup';

export const Route = createFileRoute('/_auth/signup/admin')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: '관리자 권한 신청',
    },
  }),
});

function RouteComponent() {
  const { adminPage, reset } = useSignupStore((state) => state);

  useEffect(() => {
    reset();
  }, []);

  function render() {
    switch (adminPage) {
      case 'check':
        return <AdminSignupIdCheck />;
      case 'auth':
        return <AdminSignupAuth />;
      case 'signup':
        return <AdminSignupForm />;
      case 'complate':
        return <>완료</>;
      default:
        return <AdminSignupAuth />;
    }
  }

  return <>{render()}</>;
}
