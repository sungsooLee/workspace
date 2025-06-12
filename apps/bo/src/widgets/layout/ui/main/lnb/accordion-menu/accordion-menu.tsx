import { memo, useState, useEffect } from 'react';
import { useRouter } from '@tanstack/react-router';
import { map, intersection } from 'lodash';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { Accordion, AccordionItem } from '@learnway/ui';

import type { Menu } from '@learnway/auth';
import { useActiveMenuDepthState } from '@learnway/auth';

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
  const { t } = useTranslation();
  const router = useRouter();
  const [value, setValue] = useState<string[] | undefined>();
  const [activeMenuDepth] = useActiveMenuDepthState();

  /**
   * current routing menu의 경우 accordion open
   */
  useEffect(() => {
    if (!activeMenuDepth || !activeMenuDepth?.length || !activeMenuDepth?.[depth - 1]) {
      return;
    }
    setValue([...(value ?? []), activeMenuDepth[depth - 1].key]);
  }, [activeMenuDepth, depth]);

  /**
   * active: current routing menu (4 depth에 한해 적용 - 디자인 정의)
   * 2~3 depth의 경우 route path가 있는 경우, title click시 navigate, 없는 경우 accordion open
   */
  const items = useCreation(() => {
    return (menus ?? [])
      .filter((menu) => menu.isHiddenMenu === false)
      .map((menu: Menu, index: number) => {
        const children = menu?.children?.filter((m) => m.isHiddenMenu === false);

        let active = false;
        if (activeMenuDepth && activeMenuDepth[depth - 1]) {
          active = activeMenuDepth[depth - 1]?.path === menu?.path;
        } else if (depth === 4 && activeMenuDepth) {
          const currentPath = router.state.location.pathname;
          active = currentPath === menu?.path;
        }

        return {
          value: `menu_${index}`,
          title: (
            <span className={active ? styles.active : ''} onClick={() => handleNavigate(menu)}>
              {import.meta.env.VITE_LANGUAGE_DEV === 'true'
                ? t(`${menu.menuName}`)
                : t(`HRD_CENTER_MENU.${menu.menuCode}`)}
            </span>
          ),
          children: children && (
            <AccordionMenu menus={(menu?.children as Menu[]) || []} depth={depth + 1} />
          ),
          active,
        } as AccordionItem;
      });
  }, [menus, activeMenuDepth, router.state.location.pathname]);

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
      if (menu?.children?.[0]?.path) {
        router.navigate({ to: menu.children[0].path });
      }
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
