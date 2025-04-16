import { memo } from 'react';
import { Link, useMatchRoute } from '@tanstack/react-router';

import type { Menu } from '@learnway/auth';
import { useActiveMenuDepthState, useMenuHierarchy } from '@learnway/auth';

import styles from './navigate.module.css';

function NavigateComponent() {
  const [activeMenuDepthMenu] = useActiveMenuDepthState();
  const { data } = useMenuHierarchy();

  const matchRoute = useMatchRoute();

  return (
    <div className={`${styles.start} nlp--navigate`}>
      <nav className={styles.nav}>
        <ul>
          {data?.menus?.map((menu: Menu, index: number) => {
            return (
              <li key={menu.key}>
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
                  {menu.menuName}
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
