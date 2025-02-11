import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useMatchRoute } from '@tanstack/react-router';

import { cn } from '@learnway/shared';
import { IcoHome02, IcoArrowForward } from '@learnway/icons';

import { Menu } from '../../../../../types';
import { useActiveMenuDepthState } from '../../../../../features/layout';

import styles from './breadcrumbs.module.css';

function BreadcrumbsComponent() {
  const { t } = useTranslation();
  const [activeMenuDepthMenu] = useActiveMenuDepthState();

  const matchRoute = useMatchRoute();

  if (!activeMenuDepthMenu?.[0]) {
    return <></>;
  }

  return (
    <div className={styles.start}>
      123123123
      <ul className={styles.breadcrumbs}>
        <li key={'Home'} className={styles.link_item}>
          <Link to={'/'} className={styles.active}>
            <IcoHome02 width={12} height={12} stroke="#131C30" />
          </Link>
        </li>
        {activeMenuDepthMenu &&
          activeMenuDepthMenu.map((menu: Menu) => {
            return (
              <li key={menu.key} className={styles.link_item}>
                <Link
                  to={menu.path}
                  className={matchRoute({ to: menu?.path }) ? styles.active : ''}>
                  <IcoArrowForward width={12} height={12} stroke="#131C30" />
                  {menu.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
