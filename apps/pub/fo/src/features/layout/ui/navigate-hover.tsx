import { memo, useRef, useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IcoArrowForward } from '@learnway/icons';
import styles from './navigate-hover.module.css';

interface NavigateHoverProps {
  isOpen: boolean;
}

function NavigateHoverComponent({ isOpen }: NavigateHoverProps) {
  const menuData = [
    {
      title: '지원제도',
      link: '',
      subMenu: [
        { title: 'HK 사외교육', link: '' },
        { title: '표준 사외교육', link: '' },
        { title: '어학시험 지원', link: '' },
      ],
    },
    {
      title: '성장제도',
      link: '',
      subMenu: [
        { title: 'IDP', link: '' },
        { title: '스킬', link: '' },
        { title: '뱃지', link: '' },
      ],
    },
    {
      title: '성장활동',
      link: '',
      subMenu: [
        { title: '학습소모임 허브', link: '' },
        { title: '학습커뮤니티', link: '' },
        { title: '어학시험 지원', link: '' },
        { title: '자격증 취득지원', link: '' },
      ],
    },
  ];
  return (
    <div className={`${styles.start} ${styles.menu_all} ${isOpen ? styles.active : ''}`}>
      <div className={styles.menu_inner}>
        {menuData.map((menu, index) => (
          <div key={index} className={styles.menu_div}>
            <div className={styles.menu_list}>
              <h2 className={styles.tit}>
                {menu.link ? (
                  <Link to={menu.link}>
                    <span>{menu.title}</span>
                    <IcoArrowForward width={16} height={16} stroke="#6F798B" />
                  </Link>
                ) : (
                  <span>{menu.title}</span>
                )}
              </h2>

              {/* 서브 메뉴가 있을 경우 */}
              {menu.subMenu && menu.subMenu.length > 0 && (
                <ul className={styles.list}>
                  {menu.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link to={subItem.link}>{subItem.title}</Link>
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
