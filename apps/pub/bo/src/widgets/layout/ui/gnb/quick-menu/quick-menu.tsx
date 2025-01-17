import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { MyMenu } from '../../../../../features/layout';
import { useMenuHierarchy } from '../../../service/menu.service';

import type { Menu } from '../../../../../types';

import styles from './quick-menu.module.css';

function QuickMenuComponent() {
  const { data } = useMenuHierarchy(true);

  return (
    <div className={styles._start}>
      {data?.map((menu: Menu, index: number) => {
        return (
          <Link to={menu.path} key={`QUICKMENU${index}`}>
            {menu.title}
          </Link>
        );
      })}
      <MyMenu />
    </div>
  );
}

export const QuickMenu = memo(QuickMenuComponent);
