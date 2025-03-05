import { createFileRoute } from '@tanstack/react-router';

import { Button, RadioCard, Tabs, Input, Select } from '@learnway/ui';

interface MenuParams {
  id?: string;
}

export const Route = createFileRoute('/_auth/search-account')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/search-account"!</div>;
}
