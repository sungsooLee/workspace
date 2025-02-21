import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useMatchRoute } from '@tanstack/react-router';

import { cn } from '@learnway/shared';
import { IcoHome02, IcoArrowForward } from '@learnway/icons';

import { Menu } from '../../../../../types';
import { useActiveMenuDepthState } from '../../../../../features/platform';

import styles from './breadcrumbs.module.css';

function BreadcrumbsComponent() {
  const { t } = useTranslation();
  const [activeMenuDepthMenu] = useActiveMenuDepthState();

  const matchRoute = useMatchRoute();

  const [activeMenu, setActiveMenu] = useState('home'); // 초기값 설정

  const menuItems = ['menu1', 'menu2', 'menu3', 'menu4'];

  if (!activeMenuDepthMenu?.[0]) {
    return (
      <div className={styles.start}>
        <ul className={styles.breadcrumbs}>
          {menuItems.map((item, idx) => (
            <li key={item} className={styles.link_item}>
              <Link
                to={'/'}
                onClick={() => setActiveMenu(item)}
                className={`${activeMenu === item ? styles.active : ''}`}>
                {idx === 0 && <IcoHome02 width={12} height={12} stroke="#131C30" />}

                {idx !== menuItems.length - 1 && (
                  <>
                    <IcoArrowForward width={12} height={12} stroke="#131C30" />
                    {item}
                  </>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

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
