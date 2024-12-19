import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@learnway/ui';

import { Navigate } from '../widgets/layout';
import { useSetLanguage } from '../features/system';
import { useFetchAuthUser } from '../entities/user';
import { useFetchTenant } from '../entities/tenant';
import { useLogoutUser } from '../entities/user';

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

  const handleTheme = (theme: string) => {
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
      <div className="flex h-60px bg-secondary-1">
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
          {data?.userName}님 로그인,{' '}
          <Button variant={'outline'} size={'sm'} onClick={() => handleLogout()}>
            {t('LOGOUT')}
          </Button>
          <Select onValueChange={(value: string) => handleTheme(value)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={DEFAULT_THEME}>default</SelectItem>
                <SelectItem value="red">red</SelectItem>
                <SelectItem value="green">green</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(value: string) => handleLang(value)}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select a lang" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={DEFAULT_THEME}>default</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
