import { memo, useState } from 'react';
import { useMenuHierarchy } from '../../../service/menu.service';
import { Menu } from '../../../../../types';
import styles from './navigate.module.css';
import { useMatchRoute, useRouter, useRouterState } from '@tanstack/react-router';
import { useActiveMenuDepthState } from '../../../../../features/layout';

interface LayerProps {
  menus: Menu[];
  isVisible: boolean;
}

// 2Depth 레이어 컴포넌트
const MenuLayer = memo(({ menus, isVisible }: LayerProps) => {
  const router = useRouter();
  const matchRoute = useMatchRoute();
  const [activeMenuDepthMenu] = useActiveMenuDepthState();
  if (!isVisible) return null;

  const handleMenuClick = (childMenu: Menu) => {
    router.navigate({ to: childMenu.path });
  };

  return (
    <div className={styles._start}>
      <div className="flex">
        {menus.map((menu, index) => (
          <div key={`submenu-${index}`} className="flex flex-col">
            {menu.children?.map((subMenu, idx) => (
              <button
                key={`submenu-${idx}`}
                className={`${styles.menuTitle} ${
                  subMenu.path &&
                  (matchRoute({ to: subMenu.path }) ||
                    activeMenuDepthMenu?.[0]?.path === subMenu.path)
                    ? styles._active
                    : ''
                }`}
                onClick={() => {
                  handleMenuClick(subMenu);
                }}>
                {subMenu.title}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

function NavigateComponent() {
  const [isHovered, setIsHovered] = useState(false);
  const { data: menus } = useMenuHierarchy();
  const location = useRouterState();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isActiveMenu = (menu: Menu) => {
    const isActive = location.location.pathname.startsWith(menu.path);
    const hasActiveChild = menu.children?.some(
      (child) => location.location.pathname === child.path,
    );
    return isActive || hasActiveChild;
  };

  return (
    <nav onMouseLeave={handleMouseLeave}>
      <ul className="flex space-x-2" onMouseEnter={handleMouseEnter}>
        {menus?.map((menu: Menu) => (
          <li key={menu.id}>
            <button type="button" className={isActiveMenu(menu) ? 'text-red-500' : ''}>
              {menu.title}
            </button>
          </li>
        ))}
      </ul>

      <MenuLayer menus={menus} isVisible={isHovered} />
    </nav>
  );
}

export const Navigate = memo(NavigateComponent);
