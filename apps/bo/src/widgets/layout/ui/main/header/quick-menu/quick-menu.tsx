import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { MyMenu } from '../../../../../../features/layout';
import { useMenuHierarchy } from '@learnway/auth';
import type { Menu } from '@learnway/auth';

import styles from './quick-menu.module.css';

function QuickMenuComponent() {
  const { data } = useMenuHierarchy();

  return (
    <div className={cn(styles.start, 'nlp--quick-menu')}>
      <div className={styles.menu_wrap}>
        {/* TODO 퀵메뉴 정책 확인 필요 */}
        {/**
        <ul className={styles.menu_list}>
          {data?.map((menu: Menu, index: number) => {
            return (
              <li key={menu.key}>
                <Link to={menu.path} key={menu.key} className={styles.menu_item}>
                  {menu.title}
                </Link>
              </li>
            );
          })}
        </ul>
         */}
        {/* 최근본메뉴, 즐겨찾기메뉴 */}
        <MyMenu />
      </div>
    </div>
  );
}

export const QuickMenu = memo(QuickMenuComponent);
