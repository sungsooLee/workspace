import React, { useState } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@tanstack/react-router';
import { IcoHome02, IcoArrowForward } from '@learnway/icons';
import styles from './breadcrumbs.module.css';

function BreadcrumbsComponent() {
  const { t } = useTranslation();

  const [activeMenu, setActiveMenu] = useState('home'); // 초기값 설정

  const menuItems = ['Home', 'menu1', 'menu2', 'menu3', 'menu4'];
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

              {idx !== 0 && idx !== menuItems.length && (
                <IcoArrowForward width={12} height={12} stroke="#131C30" />
              )}
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
