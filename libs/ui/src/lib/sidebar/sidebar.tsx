import React, { forwardRef } from 'react';
import * as Primitive from './sidebar.shadcn';

//export { SidebarProvider, SidebarTrigger, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarFooter };
export * from './sidebar.shadcn';

export interface SidebarComponentProps extends React.ComponentProps<typeof Primitive.Sidebar> {
  items?: Array<never>;
}

const SidebarComponent = forwardRef<
  React.ElementRef<typeof Primitive.Sidebar>,
  SidebarComponentProps
>(
  ({ items, children, ...props }) => {
    return (
      <Primitive.SidebarProvider>
        <Primitive.Sidebar >
          <h1>Left</h1>
        </Primitive.Sidebar>
        <main>
          <Primitive.SidebarTrigger />
          {children}
        </main>
      </Primitive.SidebarProvider>
    );
  })

export const Sidebar = SidebarComponent;
