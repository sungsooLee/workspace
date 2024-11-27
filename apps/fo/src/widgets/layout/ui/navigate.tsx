import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { isArray } from 'lodash';

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  Button,
} from '@learnway/ui';

import { useLogoutUser } from '../../../entities/user';
import { useMenus } from '../../../entities/menu';

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export function Navigate() {
  const [menus, setMenus] = useState([]);

  const { data } = useMenus({});
  const { logout } = useLogoutUser();

  useEffect(() => {
    if (!data) {
      return;
    }
    if (!isArray(data) || !data?.length) {
      return;
    }
    setMenus(data[0].children);
  }, [data]);

  const handleLogout = () => {
    logout();
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to={'/'}>Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => handleLogout()}>logout</MenubarTrigger>
      </MenubarMenu>
      {menus.map((menu: any, index: number) => {
        return (
          <MenubarMenu key={`MenubarMenu${index}`}>
            <MenubarTrigger>
              {menu.children ? menu.title : <Link to={menu.path}>{menu.title}</Link>}
            </MenubarTrigger>
            {menu.children && (
              <MenubarContent>
                {(menu.children ?? []).map((menuItem: any, subIndex: number) => {
                  return (
                    <MenubarItem key={`MenubarItem${subIndex}`}>
                      <Link to={menuItem.path}>{menuItem.title}</Link>
                    </MenubarItem>
                  );
                })}
              </MenubarContent>
            )}
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
}
