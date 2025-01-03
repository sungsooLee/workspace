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

import styles from './navigate.module.css';

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
    <Menubar className={styles._start}>
      {menus.map((menu: any, index: number) => {
        return (
          <MenubarMenu key={`MenubarMenu${index}`}>
            <MenubarTrigger className={styles._menuItem}>
              {menu.children ? menu.title : <Link to={menu.path}>{menu.title}</Link>}
            </MenubarTrigger>
            {menu.children && (
              <MenubarContent>
                {(menu.children ?? []).map((menuItem: any, subIndex: number) => {
                  return (
                    <MenubarItem key={`MenubarItem${subIndex}`} className={styles._menuItem}>
                      <Link to={menuItem.path}>
                        {menuItem.title}
                        <div className='bg-slate-50'>Icon</div>
                      </Link>
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
