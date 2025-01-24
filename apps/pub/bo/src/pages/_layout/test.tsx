import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';

export const Route = createFileRoute('/_layout/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="content">
      <Button variant="primary" size="sm">
        111
      </Button>
    </div>
  );
}
