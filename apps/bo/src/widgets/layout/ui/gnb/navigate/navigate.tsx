import { memo } from 'react';
import { Link, useMatchRoute } from '@tanstack/react-router';

import type { Menu } from '../../../../../types';
import { useActiveMenuDepthState } from '../../../../../features/layout';

import { useMenuHierarchy } from '../../../service/menu.service';

import styles from './navigate.module.css';

function NavigateComponent() {
  const [activeMenuDepthMenu] = useActiveMenuDepthState();
  const { data } = useMenuHierarchy();

  const matchRoute = useMatchRoute();

  return (
    <div className={`${styles.start} nlp--navigate`}>
      <nav className={styles.nav}>
        <ul>
          {data?.map((menu: Menu, index: number) => {
            return (
              <li key={menu.key}>
                <Link
                  to={menu.path}
                  key={menu.key}
                  className={
                    menu.path &&
                    (matchRoute({ to: menu?.path }) ||
                      activeMenuDepthMenu?.[0]?.path === menu?.path)
                      ? styles._active
                      : ''
                  }>
                  {menu.title}
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
