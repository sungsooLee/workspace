import { memo } from 'react';

import { cn } from '@learnway/shared';

import { SidebarProvider, SidebarTrigger } from './sidebar.shadcn';
import * as Primitive from './sidebar.shadcn';

//export { SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter };
export * from './sidebar.shadcn';

/*
import styles from './sidebar.module.css';

interface SidebarComponentProps {
  menus: AccordionItem[];
  children: React.Node;
}

function SidebarComponent() {
  return (
    <Primitive.SidebarProvider className={cn(styles._start, 'nlp--sidebar')}>
      <Primitive.Sidebar className={styles._sidebar}>
        <Primitive.SidebarContent className="nlp--sidebar-content">
          <LNB />
        </Primitive.SidebarContent>
      </Primitive.Sidebar>
      <main>
        <Primitive.SidebarTrigger />
        {children}
      </main>
    </Primitive.SidebarProvider>
  );
}

export const Sidebar = memo(SidebarComponent);
*/
