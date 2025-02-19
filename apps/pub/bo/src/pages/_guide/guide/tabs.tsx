import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Tabs } from '@learnway/ui';

export const Route = createFileRoute('/_guide/guide/tabs')({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedTabKey] = useState<string>('');
  const items = [
    {
      title: 'Tab A',
      key: 'a',
      content: <h2>Tab A content</h2>,
    },
    {
      title: 'Tab B',
      key: 'b',
      content: <h2>Tab B content</h2>,
    },
    {
      title: 'Tab C',
      key: 'c',
      content: <h2>Tab C content</h2>,
    },
  ];
  return (
    <div>
      <h2 className="guide_tit2">Tabs Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/tabs/tabs.tsx</p>
      <p className="info">variant: 'fill' | 'line' | 'round'</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
import React, { useState } from 'react';
import { Tabs } from '@learnway/ui';
const [selectedTabKey , selectedTabKey2] = useState<string>('');
  const items = [
    {
      title: 'Tab A',
      key: 'a',
      content: <h2>Tab A content</h2>,
    },
    {
      title: 'Tab B',
      key: 'b',
      content: <h2>Tab B content</h2>,
    },
    {
      title: 'Tab C',
      key: 'c',
      content: <h2>Tab C content</h2>,
    },
  ];

// 적용방법(예시)
<Tabs selectedTabKey={selectedTabKey} items={items} variant="fill" />
<Tabs selectedTabKey={selectedTabKey} items={items} variant="line" />
<Tabs selectedTabKey={selectedTabKey} items={items} variant="round" />
`}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">Tabs fill Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items} variant="fill" />
          </div>
        </div>
        <h3 className="guide_tit3">Tabs line Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items} variant="line" />
          </div>
        </div>
      </div>
      <div className="group">
        <h3 className="guide_tit3">Tabs line Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items} variant="fill" />
          </div>
        </div>
        <h3 className="guide_tit3">Tabs round Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items} variant="round" />
          </div>
        </div>
      </div>
    </div>
  );
}
