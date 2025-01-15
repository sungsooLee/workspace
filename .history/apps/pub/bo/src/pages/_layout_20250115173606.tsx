import { Outlet, createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import styles from './_layout.module.css';
import logoImage from '../assets/images/logo.png';

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
      <div className={styles.bo_wrap}>
        <header className={styles.header}>
          <h1>
            <Link to={'/guide'}>
              <img src={logoImage} alt="logo" />
            </Link>
          </h1>
          <nav>
            <ul>
              <li>
                <Link to={'/'}>대시보드</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <div className="bo_container">
        <Outlet />
      </div>
    </div>
  );
}
