import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
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
              {idx === 0 && <IcoHome02 width={12} height={12} />} {item}
              {idx !== menuItems.length - 1 && <IcoArrowForward width={12} height={12} />}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Breadcrumbs = memo(BreadcrumbsComponent);
