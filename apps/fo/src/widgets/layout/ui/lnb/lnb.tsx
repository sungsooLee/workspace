import { memo } from 'react';
import { useActiveMenuDepthState } from '../../../../features/layout';

import styles from './lnb.module.css';
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@learnway/ui';
import { AccordionMenu } from './accordion-menu/accordion-menu';

function LNBComponent() {
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
