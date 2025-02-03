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

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const DEFAULT_THEME = 'default';

  const { data } = useFetchAuthUser();
  const { data: tenant } = useFetchTenant(data?.activeTenantId);
  const { logout } = useLogoutUser();
  const { set: setLanguage } = useSetLanguage();

  const { data: languageCodes } = useCodesByCodeGroup(CODE_GROUP.LANGUAGE_CODE);
  const { data: de } = useLabelByCode(CODE_GROUP.LANGUAGE_CODE, 'de');

  useEffect(() => {
    if (!data) {
      router.navigate({ to: '/login' });
    }
  }, [data]);

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

  return (
    <div className={`${styles.start} ${styles.layout_wrap}`}>
      <GNB />
      <Breadcrumbs />
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}
