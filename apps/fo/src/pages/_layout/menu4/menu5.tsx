import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { pageRouteConfig } from '../../../features/auth';

export const Route = createFileRoute('/_layout/menu4/menu5')({
  component: RouteComponent,
  ...pageRouteConfig(),
});

function RouteComponent() {
  return 'Hello /_layout/menu5!';
}
