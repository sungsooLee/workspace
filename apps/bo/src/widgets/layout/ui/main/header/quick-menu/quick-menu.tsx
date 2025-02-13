import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { cn } from '@learnway/shared';

import { MyMenu } from '../../../../../../features/layout';
import { useMenuHierarchy } from '../../../../service/menu.service';

import type { Menu } from '../../../../../../types';

import styles from './quick-menu.module.css';

function QuickMenuComponent() {
  const { data } = useMenuHierarchy(true);

  return (
    <div className={cn(styles.start, 'nlp--quick-menu')}>
      <div className={styles.menu_wrap}>
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
        <MyMenu />
      </div>
    </div>
  );
}

export const QuickMenu = memo(QuickMenuComponent);
