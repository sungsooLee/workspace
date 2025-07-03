import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Accordion } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/accordion')({
  component: RouteComponent,
});

function RouteComponent() {
  const [value, setValue] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const dummyItems = [
    {
      value: 'aaaa',
      title: 'title A',
      children: <div>Content A</div>,
    },
    {
      value: 'bbbb',
      title: 'title B',
      children: <div>Content B</div>,
    },
  ];

  const dummyItems2 = [
    {
      value: 'aaaa',
      title: 'title A',
      children: <div>Content A</div>,
    },
    {
      value: 'bbbb',
      title: 'title B',
      children: <div>Content B</div>,
    },
  ];

  return (
    <div>
      <h2 className="guide_tit2">Accordion Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/accordion/accordion.tsx</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { Accordion } from '@learnway/ui';
  import { getRandomId } from '@learnway/shared';

  const dummyItems = [
  {
    value: getRandomId(),
    title: 'title A',
    children: <div>Content A</div>,
  },
  {
    value: getRandomId(),
    title: 'title B',
    children: <div>Content B</div>,
  },
];
  
  // 적용방법(예시)
  <Accordion />`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">single</h3>
        <div className="flex_box">
          <div className="desc">
            {
              <Accordion
                items={dummyItems}
                value={value}
                onValueChange={(value) => setValue(value as string)}
              />
            }
          </div>
        </div>
        <h3 className="guide_tit3">multiple</h3>
        <div className="flex_box">
          <div className="desc">
            {
              <Accordion
                items={dummyItems2}
                value={value2}
                onValueChange={(value2) => setValue2(value2 as string)}
                type={'multiple'}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
}
