import { Link, useRouter } from '@tanstack/react-router';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { Menu } from '@learnway/auth/types';
import styles from './navigate-hover.module.css';

interface NavigateHoverComponentProps {
  onClose: () => void;
  isOpen: boolean;
  hoverMenu: Menu;
}

function NavigateHoverComponent({ hoverMenu, isOpen, onClose }: NavigateHoverComponentProps) {
  const { t } = useTranslation();
  const router = useRouter();
  // const { data } = useMenuHierarchy();

  useEffect(() => {
    return router.history.subscribe((navigation) => {
      onClose();
    });
  }, [router.history, onClose]);

  return (
    <div className={`${styles.start} ${styles.menu_all} ${styles.active}`} onMouseLeave={onClose}>
      <div className={styles.menu_inner}>
        <div className={styles.menu_info}>
          <h2 className={styles.tit}>{t(hoverMenu.menuCode)}</h2>
          <div className={styles.info}>{hoverMenu.menuDesc}</div>
        </div>

        <div className={styles.menu_list_div}>
          {hoverMenu.children?.map((menu, subIndex) => (
            <div key={subIndex} className={styles.menu_div}>
              <div className={styles.menu_list}>
                <h3 className={styles.tit}>
                  <span>{t(menu.menuCode)}</span>
                </h3>
                <ul className={styles.list}>
                  {menu.children?.map((sub, itemIndex) => (
                    <li key={itemIndex}>
                      <Link to={sub.path}>{t(sub.menuCode)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const NavigateHover = memo(NavigateHoverComponent);
