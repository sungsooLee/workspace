import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/pms/widget-register')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>111</p>
    </div>
  );
}
