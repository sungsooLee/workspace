import { useState, useEffect } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { isArray } from 'lodash';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@learnway/ui';

import { useMenus } from '../../../entities/menu';

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 This is a starter component and can be deleted.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 Delete this file and get started with your project!
 * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
export function Navigate() {
  const { data } = useMenus({});
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (!isArray(data) || !data?.length) {
      return;
    }
    setMenus(data[0].children);
  }, [data]);

  const goPage = (to: string) => {
    //router.navigate({ to });
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Link to={'/'}>Home</Link>
        </MenubarTrigger>
      </MenubarMenu>
      {menus.map((menu: any) => {
        return (
          <MenubarMenu>
            <MenubarTrigger>
              {menu.children ? menu.title : <Link to={menu.path}>{menu.title}</Link>}
            </MenubarTrigger>
            {menu.children && (
              <MenubarContent>
                {(menu.children ?? []).map((menuItem: any) => {
                  return (
                    <MenubarItem>
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
