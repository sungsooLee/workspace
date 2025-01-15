import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import logoImage from '../../assets/images/logo.png';

import { cn } from '@learnway/shared';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  // router.navigate({ to: '/login' });

  return (
    <div>
      <div className="bo_wrap">
        <header>
          <h1>
            <img src={logoImage} alt="logo" />
          </h1>
        </header>
      </div>
      <div className="p-10">
        <Outlet />
      </div>
    </div>
  );
}
