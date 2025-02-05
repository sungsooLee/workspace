import { createFileRoute } from '@tanstack/react-router';
import { Radio } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/radio')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Checkbox Component Guide</h2>
      <h3 className="guide_tit3">Basic</h3>
      <Radio
        options={[
          { value: 'type1', label: 'aaaaa' },
          { value: 'type2', label: 'bbbbb' },
          { value: 'type3', label: 'ccccc' },
        ]}
      />
      <h3 className="guide_tit3">disabled</h3>
      <Radio
        options={[
          { value: 'type4', label: 'ddd' },
          { value: 'type5', label: 'eeee' },
          { value: 'type6', label: 'ffff' },
        ]}
        disabled
      />
    </div>
  );
}
