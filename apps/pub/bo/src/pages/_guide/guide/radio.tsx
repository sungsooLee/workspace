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
          { value: 'type1-2', label: 'bbbbb' },
          { value: 'type1-3', label: 'ccccc' },
        ]}
      />
      <Radio
        options={[
          { value: 'type2-1', label: 'aaaaa' },
          { value: 'type2-2', label: 'bbbbb' },
          { value: 'type2-3', label: 'ccccc' },
        ]}
        size="md"
      />
      <Radio
        options={[
          { value: 'type3-1', label: 'aaaaa' },
          { value: 'type3-2', label: 'bbbbb' },
          { value: 'type3-3', label: 'ccccc' },
        ]}
        size="sm"
      />
      <h3 className="guide_tit3">disabled</h3>
      <Radio
        options={[
          { value: 'type4-1', label: 'ddd' },
          { value: 'type4-2', label: 'eeee' },
          { value: 'type4-3', label: 'ffff' },
        ]}
        disabled
      />
    </div>
  );
}
