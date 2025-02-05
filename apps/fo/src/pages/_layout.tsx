import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button, FieldType, Select } from '@learnway/ui';
import { CODE_GROUP, codeConfig } from '@learnway/config';

import { GNB, Layout } from '../widgets/layout';
import { useSetLanguage } from '../features/system';
import { useFetchAuthUser } from '../entities/user';
import { useFetchTenant } from '../entities/tenant';
import { useLogoutUser } from '../entities/user';
import { useCodesByCodeGroup, useLabelByCode } from '../entities/system';
import type { Code } from '../entities/system';
import { Breadcrumbs } from '../widgets/layout/ui/container/breadcrumbs/breadcrumbs';
import styles from './_layout.module.css';
import { Footer } from '../widgets/layout/ui/footer/footer';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const DEFAULT_THEME = 'default';

  const { data, isLoading } = useFetchAuthUser();
  const { data: tenant } = useFetchTenant(data?.activeTenantId);
  const { logout } = useLogoutUser();
  const { set: setLanguage } = useSetLanguage();

  const { data: languageCodes } = useCodesByCodeGroup(CODE_GROUP.LANGUAGE_CODE);
  const { data: de } = useLabelByCode(CODE_GROUP.LANGUAGE_CODE, 'de');

  // useEffect(() => {
  //   if (!data) {
  //     router.navigate({ to: '/login' });
  //   }
  // }, [data]);

  useEffect(() => {
    if (!isLoading && !data && currentPath !== '/login') {
      router.navigate({
        to: '/login',
        search: { redirect: currentPath }, // 현재 URL을 쿼리 파라미터로 전달
      });
    }
  }, [data, isLoading, currentPath]);

  useEffect(() => {
    if (!tenant) {
      return;
    }
    document.title = tenant.windowTitle;
  }, [tenant]);

  const handleLogout = () => {
    logout();
  };

  const handleTheme = (themeConfig: string, theme = '') => {
    console.log('handleTheme', theme);

    document.documentElement.classList.remove('red');
    document.documentElement.classList.remove('green');
    if (theme === DEFAULT_THEME) {
      return;
    }
    document.documentElement.classList.add(theme);
  };

  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
  );

  const handleLang = (lang: string) => {
    setLanguage(lang);
  };

  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches),
  );

  if (isLoading) {
    return <div>Loading...</div>; // 또는 로딩 컴포넌트
  }
  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      <GNB />
      <Layout>
        <Outlet />
      </Layout>
      <Footer />
    </div>
  );
}
