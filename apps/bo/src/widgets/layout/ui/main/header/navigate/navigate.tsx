import { memo, useMemo } from 'react';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import type { Menu } from '@learnway/auth/types';
import { useActiveMenuDepthState, useMenuHierarchy } from '@learnway/auth/entities';

import styles from './navigate.module.css';
import { cn } from '@learnway/shared';

function NavigateComponent() {
  const { t } = useTranslation();
  const [activeMenuDepthMenu, setActiveMenuDepthMenu] = useActiveMenuDepthState();
  const { data } = useMenuHierarchy();
  // const matchRoute = useMatchRoute();

  // 히든메뉴는 노출하지 않음.
  const visibleMenu = useMemo(() => {
    function filterVisibleTreeList(menu: Menu[]): Menu[] {
      return menu.map(filterVisibleNode).filter((node): node is Menu => node !== null);
    }
    function filterVisibleNode(node: Menu): Menu | null {
      const filteredChildren = (node.children ?? [])
        .map(filterVisibleNode)
        .filter((n): n is Menu => n !== null);

      if (node.isHiddenMenu === false) {
        return {
          ...node,
          children: filteredChildren,
        };
      }
      return null;
    }
    if (!data?.menus) return [];
    return filterVisibleTreeList(data?.menus);
  }, [data]);

  return (
    <div className={`${styles.start} nlp--navigate`}>
      <nav className={styles.nav}>
        <ul>
          {visibleMenu?.map((menu: Menu, index: number) => {
            const isActive = menu.menuId === activeMenuDepthMenu?.[0]?.menuId;
            const path = menu.path ? menu.path : menu.children?.[0]?.path;
            const menuName =
              import.meta.env.VITE_LANGUAGE_DEV === 'true'
                ? t(`${menu.menuName}`)
                : t(`HRD_CENTER_MENU.${menu.menuCode}`);
            return (
              <li key={`${menu.menuId}_${index}`}>
                <Link to={path} className={cn(isActive && 'active')}>
                  {menuName}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);
