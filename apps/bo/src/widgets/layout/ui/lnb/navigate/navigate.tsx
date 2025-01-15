import { memo } from 'react';
import { useRouter } from '@tanstack/react-router';

import { useActiveMenuState } from '../../../../../features/layout';
import type { Menu } from '../../../../../types';

import { useMenuHierarchy } from '../../../service/menu.service';

import styles from './navigate.module.css';

function NavigateComponent() {
  const [, setActiveMenu] = useActiveMenuState();
  const { data } = useMenuHierarchy();
  const router = useRouter();

  const handleMenuClick = (menu: Menu) => {
    setActiveMenu(menu);
    router.navigate({ to: menu.path });
  };

  return (
    <div className={styles._start}>
      {data?.map((menu: Menu, index: number) => {
        return (
          <div onClick={() => handleMenuClick(menu)} key={`NAVI${index}`}>
            {menu.title}
          </div>
        );
      })}
    </div>
  );
}

export const Navigate = memo(NavigateComponent);
