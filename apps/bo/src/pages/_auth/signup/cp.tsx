import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { pageRouteConfig } from '@features/auth/index';
import { CPSignupCheck, CPSignupForm } from '@features/user/signup';
import { CPSignupType } from '@types';
import { useCPStore } from '@features/user/signup/store/use-cp-store';

export const Route = createFileRoute('/_auth/signup/cp')({
  component: RouteComponent,
  ...pageRouteConfig({
    meta: {
      title: 'CP사 회원가입',
    },
  }),
});

function RouteComponent() {
  const { businessCode, page, reset } = useCPStore((state) => state);

  useEffect(() => {
    reset();
  }, []);
  console.log('aaa', businessCode);
  console.log('bbb', page);

  function render() {
    switch (page) {
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
