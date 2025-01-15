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
        {/* header */}
        <header className={styles.header}>
          <h1>
            <Link to={'/'}>
              <img src={logoImage} alt="logo" />
            </Link>
          </h1>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link to={'/'}>대시보드</Link>
              </li>
              <li>
                <Link to={'/'}>채널관리</Link>
              </li>
              <li>
                <Link to={'/'}>교육운영</Link>
              </li>
              <li>
                <Link to={'/'}>교육자원</Link>
              </li>
              <li>
                <Link to={'/'}>교육제도</Link>
              </li>
              <li>
                <Link to={'/'}>교육통계</Link>
              </li>
              <li>
                <Link to={'/'}>고객사운영</Link>
              </li>
              <li>
                <Link to={'/'}>플랫폼관리</Link>
              </li>
            </ul>
          </nav>
        </header>
        {/* header */}
      </div>
      <main className={styles.bo_container}>
        {/* LNB */}
        <aside>lnb</aside>
        {/* LNB */}

        {/* content */}
        <div className={styles.content}>
          <Outlet />
        </div>
        {/* content */}
      </main>

      {/* footer */}
      <footer className={styles.bo_footer}>footer</footer>
      {/* footer */}
    </div>
  );
}
