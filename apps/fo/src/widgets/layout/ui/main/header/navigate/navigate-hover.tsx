import { memo, useRef, useEffect, useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { IcoArrowForward } from '@learnway/icons';
import styles from './navigate-hover.module.css';

import { useMenuHierarchy } from '../../../../service/menu.service';

interface NavigateHoverComponentProps {
  onClose: () => void;
  isOpen: boolean;
}

function NavigateHoverComponent({ isOpen, onClose }: NavigateHoverComponentProps) {
  const router = useRouter();
  const { data: menus } = useMenuHierarchy();

  useEffect(() => {
    return router.history.subscribe((navigation) => {
      onClose();
    });
  }, [router.history, onClose]);

  return (
    <div className={`${styles.start} ${styles.menu_all} ${isOpen ? styles.active : ''}`}>
      <div className={styles.menu_inner}>
        {menus.map((menu, index) => (
          <div key={index} className={styles.menu_div}>
            <div className={styles.menu_list}>
              <h2 className={styles.tit}>
                {menu.path ? (
                  <Link to={menu.path}>
                    <span>{menu.menuName}</span>
                    <IcoArrowForward width={16} height={16} stroke="#6F798B" />
                  </Link>
                ) : (
                  <span>{menu.menuName}</span>
                )}
              </h2>

              {menu.children && menu.children.length > 0 && (
                <ul className={styles.list}>
                  {menu.children.map((subMenu, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subMenu.path}>{subMenu.menuName}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const NavigateHover = memo(NavigateHoverComponent);
