import { createFileRoute } from '@tanstack/react-router';
import { Switch } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/switch')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Switch Component Guide</h2>
      <Switch id="aaa" label="ssss" />
    </div>
  );
}
