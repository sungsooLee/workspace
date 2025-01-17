import { useEffect } from 'react';
import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';

import { GNB, Layout } from '../widgets/layout';

import styles from './_layout.module.css';
import logoImage from '../assets/images/logo.png';

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
});

function LayoutComponent() {
  const { t } = useTranslation();
  const router = useRouter();

  // router.navigate({ to: '/login' });

  return (
    <div>
      <GNB />
      <Layout>
        <Outlet />
      </Layout>
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

        <main className={styles.bo_container}>
          {/* LNB */}
          <aside className={styles.lnb}>lnb</aside>
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
    </div>
  );
}
