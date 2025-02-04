import { createFileRoute } from '@tanstack/react-router';
import { Checkbox } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/checkbox')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Checkbox Component Guide</h2>
      <h3 className="guide_tit3">default</h3>
      <Checkbox label="default" />
      <h3 className="guide_tit3">disabled</h3>
      <Checkbox label="disabled" disabled />
    </div>
  );
}
