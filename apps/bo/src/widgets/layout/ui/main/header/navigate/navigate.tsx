import { memo } from 'react';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import type { Menu } from '@learnway/auth';
import { useActiveMenuDepthState, useMenuHierarchy } from '@learnway/auth';

import styles from './navigate.module.css';

function NavigateComponent() {
  const { t } = useTranslation();
  const [activeMenuDepthMenu] = useActiveMenuDepthState();
  const { data } = useMenuHierarchy();
  console.log('useMenuHierarchy', data);
  const matchRoute = useMatchRoute();

  return (
    <div className={`${styles.start} nlp--navigate`}>
      <nav className={styles.nav}>
        <ul>
          {data?.menus?.map((menu: Menu, index: number) => {
            return (
              <li key={`${menu.key}_${index}`}>
                <Link
                  to={menu.path}
                  key={menu.key}
                  className={
                    menu.path &&
                    (matchRoute({ to: menu?.path }) ||
                      activeMenuDepthMenu?.[0]?.path === menu?.path)
                      ? styles.active
                      : ''
                  }
                >
                  {import.meta.env.VITE_LANGUAGE_DEV === 'true'
                    ? t(`${menu.menuName}`)
                    : t(`MENU.${menu.menuCode}`)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);
