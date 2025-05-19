import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { pageRouteConfig } from '@features/auth/index';
import { CPSignupCheck, CPSignupForm } from '@features/user/signup';
import { useSignupStore } from '@features/user/signup/store/use-signup-store';

export const Route = createFileRoute('/_auth/signup/cp')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'CP사 회원가입',
    },
  }),
});

function RouteComponent() {
  const { businessCode, cpPage, reset } = useSignupStore((state) => state);

  useEffect(() => {
    reset();
  }, []);

  function render() {
    switch (cpPage) {
      case 'check':
        return <CPSignupCheck />;
      case 'signup':
        return <CPSignupForm />;
      case 'complate':
        return <>완료</>;
      default:
        return <CPSignupCheck />;
    }
  }

  return <>{render()}</>;
}
