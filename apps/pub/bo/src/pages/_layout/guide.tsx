import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@learnway/ui';
export const Route = createFileRoute('/_layout/guide')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Button className={'nlp--button custom--button'}>button</Button>
    </div>
  );
}
