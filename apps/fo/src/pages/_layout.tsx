import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { Button, FieldType, Select } from '@learnway/ui';
import { CODE_GROUP, codeConfig } from '@learnway/config';

import { GNB, Layout, Navigate } from '../widgets/layout';
import { useSetLanguage } from '../features/system';
import { useFetchAuthUser } from '../entities/user';
import { useFetchTenant } from '../entities/tenant';
import { useLogoutUser } from '../entities/user';
import { useCodesByCodeGroup, useLabelByCode } from '../entities/system';
import type { Code } from '../entities/system';

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
    <div>
      <GNB />
      <Layout>
        <Outlet />
      </Layout>
      {/* <div className="flex h-60px bg-secondary-1">
        <div className="flex gap-10 items-center">
          <Link to={'/'}>
            {(tenant?.logoImageUrl && (
              <img src={tenant?.logoImageUrl} title={tenant.name} className="h-16" />
            )) ??
              tenant?.name}
          </Link>
          <Navigate />
        </div>
        <div className="flex grow"></div>
        <div className="flex text-sm items-baseline justify-end gap-4 pt-4 pe-5">
          {data?.userName}님 로그인, {de}{' '}
          {codeConfig.getLabelByCode(CODE_GROUP.LANGUAGE_CODE, 'de')}
          <Button variant={'outline'} size={'sm'} onClick={() => handleLogout()}>
            {t('LOGOUT')}
          </Button>
          <Select
            type={FieldType.SELECT}
            name='name'
            label='label'
            options={[
              {value: DEFAULT_THEME, label: 'default'},
              {value: 'red', label: 'red'},
              {value: 'green', label: 'green'},
            ]}
            onChange={(value: string) => handleTheme(value)}
          />
          <Select
            type={FieldType.SELECT}
            name='name'
            label='label'
            options={
              languageCodes.map((code: Code, index: number) => {
                return {value: code.code, label: code.label}
              })
            }
            onChange={(value: string) => handleLang(value)}
          />
        </div>
      </div>
      <div className="p-10">
        <Outlet />
      </div> */}
    </div>
  );
}
