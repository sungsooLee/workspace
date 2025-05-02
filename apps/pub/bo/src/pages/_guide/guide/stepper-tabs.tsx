import { createFileRoute } from '@tanstack/react-router';
import { StepperTabs } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/stepper-tabs')({
  component: RouteComponent,
});

function RouteComponent() {
  const items = [
    {
      title: 'Tab A',
      key: 'a',
      content: 'Tab A',
    },
    {
      title: 'Tab B',
      key: 'b',
      content: 'Tab B',
    },
    {
      title: 'Tab C',
      key: 'c',
      content: 'Tab C',
    },
  ];
  return (
    <div>
      <h2 className="guide_tit2">Stepper Tabs Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/tabs/stepper-tabs/stepper-tabs.tsx</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { StepperTabs } from '@learnway/ui';  
  const items = [
    {
      title: 'Tab A',
      key: 'a',
      content: '',
    },
    {
      title: 'Tab B',
      key: 'b',
      content: '',
    },
    {
      title: 'Tab C',
      key: 'c',
      content: '',
    },
  ];
  `}
          </code>
        </pre>
      </div>

      <div className="group">
        <h3 className="guide_tit3">Stepper Tabs</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <StepperTabs type={'sub-progress'} items={items} />
          </div>
        </div>

        <div className="code_example">
          <pre className="code_block">
            <code>{`<Dropdown
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
  />`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
