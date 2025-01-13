import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMatchRoute } from '@tanstack/react-router';

import { cn } from '@learnway/shared';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@learnway/ui';

import { Menu, MenuHierarchy } from '../../../../types/entities';
import { useActiveMenuState } from '../../../../features/layout';
import { Navigate } from './navigate/navigate';

import styles from './lnb.module.css';

function LNBComponent() {
  const { t } = useTranslation();

  const [activeMenu, setActiveMenu] = useActiveMenuState();

  const matchRoute = useMatchRoute();

  return (
    <Sidebar className={styles._start}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{activeMenu?.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {activeMenu?.children?.map((menu: MenuHierarchy) => (
                <SidebarMenuItem key={menu.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={menu.path}
                      className={menu.path && matchRoute({ to: menu.path }) ? styles._active : ''}>
                      <span>{menu.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export const LNB = memo(LNBComponent);
