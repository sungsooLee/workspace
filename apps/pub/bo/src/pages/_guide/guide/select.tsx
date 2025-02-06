import { createFileRoute } from '@tanstack/react-router';
import { Select } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/select')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h2 className="guide_tit2">Select Component Guide</h2>
      <h3 className="guide_tit3">Select 사용예시</h3>
      <Select
        size="lg"
        options={[
          { value: 'type1', label: 'aaaaa' },
          { value: 'type2', label: 'bbbbb' },
          { value: 'type3', label: 'ccccc' },
          { value: 'type4', label: 'ddd' },
          { value: 'type5', label: 'eeee' },
          { value: 'type6', label: 'fffff' },
          { value: 'type7', label: 'ggggg' },
          { value: 'type8', label: 'hhhhh' },
          { value: 'type9', label: 'iiii' },
          { value: 'type0', label: 'jjjj' },
          { value: 'type11', label: 'kkkk' },
          { value: 'type12', label: 'lll' },
        ]}
      />
    </div>
  );
}
