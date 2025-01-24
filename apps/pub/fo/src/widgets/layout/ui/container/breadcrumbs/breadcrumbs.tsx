import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@tanstack/react-router';
import { IcoHome03, IcoArrowForward } from '@learnway/icons';
import styles from './breadcrumbs.module.css';

function BreadcrumbsComponent() {
  const { t } = useTranslation();
  const menuItems = ['menu1', 'menu2', 'menu3', 'menu4'];
  return (
    <div className={`${styles.start} ${styles.breadcrumbs}`}>
      <ul className={styles.breadcrumbs}>
        {menuItems.map((item, idx) => (
          <li key={idx} className="link_item">
            <Link to={'/'}>
              {idx === 0 && <IcoHome03 width={16} height={16} stroke="#6F798B" />} {item}
              {idx !== menuItems.length - 1 && (
                <IcoArrowForward width={12} height={12} stroke="#131C30" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
