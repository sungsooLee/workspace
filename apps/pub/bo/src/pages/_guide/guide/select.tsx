import { createFileRoute } from '@tanstack/react-router';
import { Select } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/select')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Select Component Guide</h2>
      <Select
        options={[
          { value: 'type1', label: 'aaaaa' },
          { value: 'type2', label: 'bbbbb' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type3', label: 'ccccc' },
        ]}
      />
    </div>
  );
}
