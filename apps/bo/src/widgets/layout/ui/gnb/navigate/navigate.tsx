import { memo } from 'react';
import { useRouter, useMatchRoute } from '@tanstack/react-router';

import type { Menu } from '../../../../../types';
import { useActiveMenuDepthState } from '../../../../../features/layout';

import { useMenuHierarchy } from '../../../service/menu.service';

import styles from './navigate.module.css';

function NavigateComponent() {
  const [activeMenuDepthMenu, setActiveMenuDepthMenu] = useActiveMenuDepthState();
  const { data } = useMenuHierarchy();
  const router = useRouter();

  const matchRoute = useMatchRoute();

  const handleMenuClick = (menu: Menu) => {
    setActiveMenuDepthMenu([menu]);
    router.navigate({ to: menu.path });
  };

  return (
    <div className={styles._start}>
      {data?.map((menu: Menu, index: number) => {
        return (
          <div
            onClick={() => handleMenuClick(menu)}
            key={`NAVI${index}`}
            className={
              menu.path &&
              (matchRoute({ to: menu.path }) || activeMenuDepthMenu?.[0].path === menu.path)
                ? styles._active
                : ''
            }>
            {menu.title}
          </div>
        );
      })}
    </div>
  );
}

export const Navigate = memo(NavigateComponent);
