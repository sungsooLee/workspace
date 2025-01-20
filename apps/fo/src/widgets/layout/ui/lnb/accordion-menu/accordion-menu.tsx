import { memo, useEffect, useState } from 'react';
import { Menu } from '../../../../../types';
import { useActiveMenuDepthState } from '../../../../../features/layout';
import { useCreation } from 'ahooks';
import { Accordion, AccordionItem } from '@learnway/ui';
import { cn } from '@learnway/shared';

import styles from './accordion-menu.module.css';
import { Link } from '@tanstack/react-router';

interface AccordionMenuComponentProps {
  menus: Menu[];
  className: string;
  depth: number;
}

const AccordionMenuComponent = ({ menus, depth, className }: AccordionMenuComponentProps) => {
  const [value, setValue] = useState<string>();
  const [activeMenuDepth] = useActiveMenuDepthState();

  const items = useCreation(() => {
    return (menus ?? []).map((menu: Menu) => {
      const active =
        activeMenuDepth &&
        activeMenuDepth[depth - 1] &&
        activeMenuDepth[depth - 1]?.path === menu?.path;

      return {
        key: menu.key,
        title: (
          <span className={active ? styles._active : ''}>
            {menu.path ? <Link to={menu.path}>{menu.title}</Link> : menu.title}
          </span>
        ),
        children: menu?.children && (
          <AccordionMenu menus={menu?.children} className={styles._depth3} depth={depth + 1} />
        ),
      } as AccordionItem;
    });
  }, [menus, activeMenuDepth]);

  useEffect(() => {
    setValue(activeMenuDepth && activeMenuDepth?.[depth - 1] && activeMenuDepth[depth - 1].key);
  }, [activeMenuDepth]);

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  return (
    <Accordion
      items={items}
      className={cn(styles._start, className)}
      value={value}
      onValueChange={(e) => handleValueChange(e as string)}></Accordion>
  );
};

export const AccordionMenu = memo(AccordionMenuComponent);
