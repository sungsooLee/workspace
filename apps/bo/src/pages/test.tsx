import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { LNB } from '../widgets/layout';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <span>test</span>
    // <SidebarProvider>
    //   <LNB />
    //   <main>
    //     <SidebarTrigger />
    //     test
    //   </main>
    // </SidebarProvider>
  );
}
