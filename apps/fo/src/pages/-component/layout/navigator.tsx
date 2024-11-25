import { useState, useEffect } from 'react';
import cn from 'clsx';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
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
export function Navigator() {
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

  return (
    <Menubar>
      {menus.map((menu: any) => {
        return (
          <MenubarMenu>
            <MenubarTrigger>{menu.title}</MenubarTrigger>
            {menu.children && (
              <MenubarContent>
                {(menu.children ?? []).map((menuItem: any) => {
                  return <MenubarItem>{menuItem.title}</MenubarItem>;
                })}
              </MenubarContent>
            )}
          </MenubarMenu>
        );
      })}
    </Menubar>
  );
}
