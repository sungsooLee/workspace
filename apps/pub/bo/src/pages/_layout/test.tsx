import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';

export const Route = createFileRoute('/_layout/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="content">
      <div>
        <Button variant="primary" size="xs" disabled>
          버튼
        </Button>
        <Button variant="primary" size="sm">
          버튼
        </Button>
        <Button variant="primary" size="md">
          버튼
        </Button>
        <Button variant="primary" size="lg">
          버튼
        </Button>
      </div>
      <div>
        <Button variant="line" size="sm" disabled>
          버튼
        </Button>
        <Button variant="line" size="lg">
          버튼
        </Button>
      </div>
      <div>
        <Button variant="gray" size="sm" disabled>
          버튼
        </Button>
        <Button variant="gray" size="md">
          버튼
        </Button>
        <Button variant="gray" size="lg">
          버튼
        </Button>
      </div>
      <div>
        <Button variant="gray2" size="sm" disabled>
          111
        </Button>
        <Button variant="gray2" size="xs">
          111
        </Button>
      </div>
    </div>
  );
}
