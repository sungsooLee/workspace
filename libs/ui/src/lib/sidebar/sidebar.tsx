import { memo } from 'react';

import { SidebarProvider, SidebarTrigger } from './sidebar.shadcn';
import * as Primitive from './sidebar.shadcn';

//export { SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter };
export * from './sidebar.shadcn';

function SidebarComponent() {
  return (
    <Primitive.Sidebar className="nlp--sidebar">
      <Primitive.SidebarHeader className="nlp--sidebar-header"></Primitive.SidebarHeader>
      <Primitive.SidebarContent className="nlp--sidebar-content">
        <Primitive.SidebarGroup></Primitive.SidebarGroup>
      </Primitive.SidebarContent>
      <Primitive.SidebarFooter />
    </Primitive.Sidebar>
  );
}

//export const Sidebar = memo(SidebarComponent);
