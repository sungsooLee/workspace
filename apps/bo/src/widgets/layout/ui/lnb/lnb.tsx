import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@learnway/shared';
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@learnway/ui';

import { useActiveMenuDepthState } from '../../../../features/layout';

import { AccordionMenu } from './accordion-menu/accordion-menu';

import styles from './lnb.module.css';

function LNBComponent() {
  const { t } = useTranslation();

  const [activeMenuDepth] = useActiveMenuDepthState();

  if (!activeMenuDepth?.[0]) {
    return <></>;
  }

  return (
    <SidebarContent className={styles._start}>
      <SidebarGroup>
        <SidebarGroupLabel>{activeMenuDepth[0].title}</SidebarGroupLabel>
        <SidebarGroupContent>
          {activeMenuDepth[0]?.children && (
            <AccordionMenu
              menus={activeMenuDepth[0]?.children}
              depth={2}
              className={styles._depth2}
            />
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

export const LNB = memo(LNBComponent);
