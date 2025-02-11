import { createFileRoute } from '@tanstack/react-router';
import { Switch } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/switch')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Switch Component Guide</h2>
      <h3 className="guide_tit3">Switch 기본</h3>
      <Switch id="id-1" label="Label" />
      <h3 className="guide_tit3">Switch Checked</h3>
      <Switch id="id-2" label="Label" checked />
      <h3 className="guide_tit3">Switch Disabled</h3>
      <Switch id="id-3" label="Label" disabled />

      <h3 className="guide_tit3">Switch Label이 앞에 있는 경우</h3>
      <Switch id="id-4" label="Label" reversed />
      <h3 className="guide_tit3">Switch Checked</h3>
      <Switch id="id-5" label="Label" checked reversed />
      <h3 className="guide_tit3">Switch Disabled</h3>
      <Switch id="id-6" label="Label" disabled reversed />
    </div>
  );
}
