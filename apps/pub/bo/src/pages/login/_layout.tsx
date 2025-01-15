import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

export const Route = createFileRoute('/login/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  // router.navigate({ to: '/login' });

  return (
    <div>
      <div className="bg-secondary-1 flex flex-col">
        <Link to={'/login'}>로그인</Link>
        <Link to={'/menu3'}>메뉴3</Link>
        <Link to={'/menu4/menu5'}>메뉴4</Link>
      </div>
      <div className="p-10">
        1111
        <Outlet />
      </div>
    </div>
  );
}
