import { memo, useRef, useEffect, useState } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { IcoArrowForward } from '@learnway/icons';
import type { Menu } from '@learnway/auth/types';
import styles from './navigate-hover.module.css';

import { useMenuHierarchy } from '../../../../../../entities/menu/service/menu.service';
import { Hierarchy } from '@learnway/shared';

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
    // <div className={`${styles.start} ${styles.menu_all} ${isOpen ? styles.active : ''}`}>
    //   <div className={styles.menu_inner}>
    //     {data.menus.map((menu, index) => (
    //       <div key={index} className={styles.menu_div}>
    //         <div className={styles.menu_list}>
    //           <h2 className={styles.tit}>
    //             {menu.path ? (
    //               <Link to={menu.path}>
    //                 <span>{t(`MENU.${menu.menuCode}`)}</span>
    //                 <IcoArrowForward width={16} height={16} stroke="#6F798B" />
    //               </Link>
    //             ) : (
    //               <span>{t(`MENU.${menu.menuCode}`)}</span>
    //             )}
    //           </h2>

    //           {menu.children && menu.children.length > 0 && (
    //             <ul className={styles.list}>
    //               {(menu.children as Menu[]).map((subMenu: Menu, subIndex: number) => {
    //                 return (
    //                   <li key={subIndex}>
    //                     <Link to={subMenu.path}>{t(`MENU.${subMenu.menuCode}`)}</Link>
    //                   </li>
    //                 );
    //               })}
    //             </ul>
    //           )}
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className={`${styles.start} ${styles.menu_all} ${styles.active}`} onMouseLeave={onClose}>
      <div className={styles.menu_inner}>
        <div className={styles.menu_info}>
          <h2 className={styles.tit}>{hoverMenu.menuName}</h2>
          <div className={styles.info}>{hoverMenu.menuDesc}</div>
        </div>
        <div className={styles.menu_list_div}>
          {hoverMenu.children?.map((menu, subIndex) => (
            <div key={subIndex} className={styles.menu_div}>
              <div className={styles.menu_list}>
                <h3 className={styles.tit}>
                  <span>{menu.menuName}</span>
                </h3>
                <ul className={styles.list}>
                  {menu.children?.map((sub, itemIndex) => (
                    <li key={itemIndex}>
                      <Link to={sub.path}>{sub.menuName}</Link>
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
