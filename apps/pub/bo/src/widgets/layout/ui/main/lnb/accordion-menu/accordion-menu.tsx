import { memo, useState, useEffect } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import { map, intersection } from 'lodash';

import { cn } from '@learnway/shared';
import { Accordion, AccordionItem } from '@learnway/ui';

import { Menu } from '../../../../../../types/entities';
import { useActiveMenuDepthState } from '../../../../../../features/platform';

import styles from './accordion-menu.module.css';
import { useCreation } from 'ahooks';

interface AccordionMenuComponentProps {
  menus: Menu[];
  className?: string;
  depth: number;
  openAll?: boolean;
  onOpenStateAll?: (open: boolean) => void;
}

const AccordionMenuComponent = ({
  menus,
  depth,
  className,
  openAll,
  onOpenStateAll,
}: AccordionMenuComponentProps) => {
  const [value, setValue] = useState<string[] | undefined>();
  const [activeMenuDepth] = useActiveMenuDepthState();
  const router = useRouter();

  useEffect(() => {
    if (!activeMenuDepth || !activeMenuDepth?.length || !activeMenuDepth?.[depth - 1]) {
      return;
    }
    setValue([...(value ?? []), activeMenuDepth[depth - 1].key]);
  }, [activeMenuDepth, depth]);

  const items = useCreation(() => {
    return (menus ?? []).map((menu: Menu) => {
      const active =
        activeMenuDepth &&
        activeMenuDepth[depth - 1] &&
        activeMenuDepth[depth - 1]?.path === menu?.path;
      return {
        value: menu.key,
        title: (
          <span className={active ? styles.active : ''} onClick={() => handleNavigate(menu)}>
            {menu.title}
          </span>
        ),
        children: menu?.children && <AccordionMenu menus={menu?.children} depth={depth + 1} />,
      } as AccordionItem;
    });
  }, [menus, activeMenuDepth]);

  useEffect(() => {
    if (openAll === undefined) {
      return;
    }
    setValue(
      openAll
        ? map(
            items.filter((item) => item?.children),
            'value',
          )
        : [],
    );
  }, [openAll]);

  useEffect(() => {
    // open 가능한 value 목록
    const hasChildrenItemValues = map(
      items.filter((item) => item?.children),
      'value',
    );
    if (onOpenStateAll) {
      onOpenStateAll(
        intersection(hasChildrenItemValues, value ?? [])?.length === hasChildrenItemValues?.length,
      );
    }
  }, [value]);

  const handleNavigate = (menu: Menu) => {
    if (!menu?.path) {
      return;
    }
    router.navigate({ to: menu.path });
  };

  const handleValueChange = (value: string[]) => {
    setValue(value);
  };

  return (
    <Accordion
      type={'multiple'}
      items={items}
      className={cn(styles.start, styles[`depth${depth}`])}
      value={value}
      onValueChange={(e) => handleValueChange(e as string[])}
    />
  );
};

export const AccordionMenu = memo(AccordionMenuComponent);
