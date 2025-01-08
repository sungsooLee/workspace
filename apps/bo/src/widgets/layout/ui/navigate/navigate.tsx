import { memo } from 'react';
import { Link } from '@tanstack/react-router';

import { useMenus } from '../../service/menu.service';

import type { Menu } from '../../../../types';

import styles from './navigate.module.css';

function NavigateComponent() {
  const { data } = useMenus();

  return (
    <div className={styles._start}>
      {data?.map((menu: Menu, index: number) => {
        return <Link to={menu.path}>{menu.title}</Link>;
      })}
    </div>
  );
}

export const Navigate = memo(NavigateComponent);
