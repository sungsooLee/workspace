import { createFileRoute } from '@tanstack/react-router';
import { Input } from '@learnway/ui';

export const Route = createFileRoute('/_layout/input')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Input type="text" value="text" placeholder="입력" className="bd_none" /> <br />
      <Input type="password" placeholder="" />
    </div>
  );
}
