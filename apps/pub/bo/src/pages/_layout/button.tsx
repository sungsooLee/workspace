import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
import { IcoSearch } from '@learnway/icons';

export const Route = createFileRoute('/_layout/button')({
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
      <div>
        <Button variant="search" size="sm" iconAlign="left">
          <IcoSearch width={16} height={16} stroke="#131C30" /> 검색
        </Button>
        <Button variant="search" size="sm">
          111
        </Button>
      </div>
    </div>
  );
}
