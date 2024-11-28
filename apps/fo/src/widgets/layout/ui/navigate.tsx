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

import { useMenus } from '../service/navigate.service';

export function Navigate() {
  const [menus, setMenus] = useState([]);

  const { data } = useMenus();

  useEffect(() => {
    if (!data) {
      return;
    }
    if (!isArray(data) || !data?.length) {
      return;
    }
    setMenus(data[0].children);
  }, [data]);

  return (
    <Menubar>
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
