import { memo } from 'react';
import { Link } from '@tanstack/react-router';
import styles from './navigate-hover.module.css';
import { menuData } from '../../platform/service/menuData';

interface NavigateHoverProps {
  hoverIndex: number;
  onMouseLeave: () => void;
}

function NavigateHoverComponent({ hoverIndex, onMouseLeave }: NavigateHoverProps) {
  const current = menuData[hoverIndex];
  const currentSubMenus = current?.subMenus ?? [];

  if (!current || currentSubMenus.length === 0) return null;

  return (
    <div
      className={`${styles.start} ${styles.menu_all} ${styles.active}`}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.menu_inner}>
        <div className={styles.menu_info}>
          <h2 className={styles.tit}>{current.name}</h2>
          <div className={styles.info}>{current.desc}</div>
        </div>

        <div className={styles.menu_list_div}>
          {currentSubMenus.map((subMenu, subIndex) => (
            <div key={subIndex} className={styles.menu_div}>
              <div className={styles.menu_list}>
                <h3 className={styles.tit}>
                  <span>{subMenu.title}</span>
                </h3>
                <ul className={styles.list}>
                  {subMenu.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link to={item.link}>{item.name}</Link>
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
