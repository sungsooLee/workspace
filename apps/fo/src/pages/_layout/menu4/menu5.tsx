import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

import { metaConfig } from '../../../features/auth';

export const Route = createFileRoute('/_layout/menu4/menu5')({
  component: RouteComponent,
  ...metaConfig(),
});

function RouteComponent() {
  return 'Hello /_layout/menu5!';
}
