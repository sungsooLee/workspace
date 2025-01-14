import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/menu5/menu5-1')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /_layout/menu5/menu5-1!';
}
