import { createFileRoute } from '@tanstack/react-router';
import { RoleInfo } from '../../../../features/platform/role/ui/role-info';

export const Route = createFileRoute('/_layout/platform/role/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_layout/platform/role/"!
      <RoleInfo />
    </div>
  );
}
