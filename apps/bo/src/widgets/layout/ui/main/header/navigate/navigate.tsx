import { memo, useMemo } from 'react';
import { Link, useMatchRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import type { Menu } from '@learnway/auth';
import { useActiveMenuDepthState, useMenuHierarchy } from '@learnway/auth';

import styles from './navigate.module.css';

function NavigateComponent() {
  const { t } = useTranslation();
  const [activeMenuDepthMenu, setActiveMenuDepthMenu] = useActiveMenuDepthState();
  const { data } = useMenuHierarchy();
  console.log('useMenuHierarchy', data);
  const matchRoute = useMatchRoute();

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
            return (
              <li key={`${menu.key}_${index}`}>
                {menu.path ? (
                  <Link
                    to={menu.path}
                    key={menu.key}
                    className={
                      menu.path &&
                      (matchRoute({ to: menu?.path }) ||
                        activeMenuDepthMenu?.[0]?.path === menu?.path)
                        ? styles.active
                        : ''
                    }
                  >
                    {import.meta.env.VITE_LANGUAGE_DEV === 'true'
                      ? t(`${menu.menuName}`)
                      : t(`MENU.${menu.menuCode}`)}
                  </Link>
                ) : (
                  <Link
                    to={menu.children?.[0]?.path}
                    // onClick={() => {
                    //   setActiveMenuDepthMenu([menu]);
                    // }}
                    key={menu.key}
                    className={
                      menu.path &&
                      (matchRoute({ to: menu?.path }) ||
                        activeMenuDepthMenu?.[0]?.path === menu?.path)
                        ? styles.active
                        : ''
                    }
                  >
                    {import.meta.env.VITE_LANGUAGE_DEV === 'true'
                      ? t(`${menu.menuName}`)
                      : t(`MENU.${menu.menuCode}`)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export const Navigate = memo(NavigateComponent);
