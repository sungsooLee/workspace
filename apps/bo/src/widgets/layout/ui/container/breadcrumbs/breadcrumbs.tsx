import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useMatchRoute } from '@tanstack/react-router';

import { Menu, useActiveMenuDepthState } from '@learnway/auth';
import { IcoArrowForward, IcoHome02 } from '@learnway/icons';

import styles from './breadcrumbs.module.css';

function BreadcrumbsComponent() {
  const { t } = useTranslation();
  const [activeMenuDepthMenu] = useActiveMenuDepthState();

  const matchRoute = useMatchRoute();

  return (
    <div className={styles.start}>
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
                  className={matchRoute({ to: menu?.path }) ? styles.active : ''}
                >
                  <IcoArrowForward width={12} height={12} stroke="#131C30" />
                  {import.meta.env.VITE_LANGUAGE_DEV === 'true'
                    ? t(`${menu.menuCode}`) // t(`${menu.menuName}`)
                    : t(`MENU.${menu.menuCode}`)}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
