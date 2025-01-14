import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { Sidebar, SidebarProvider, SidebarTrigger } from '@learnway/ui';

import { LNB } from '../widgets/layout';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <LNB />
      <main>
        <SidebarTrigger />
        test
      </main>
    </SidebarProvider>
  );
}
