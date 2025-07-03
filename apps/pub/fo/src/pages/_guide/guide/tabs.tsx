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
      title: 'Tab CCCCCCCCC',
      key: 'c',
      content: <h2>Tab C content</h2>,
    },
    {
      title: 'Tab D',
      key: 'd',
      content: <h2>Tab D content</h2>,
    },
    {
      title: 'Tab E',
      key: 'e',
      content: <h2>Tab E content</h2>,
    },
  ];
  const items2 = [
    {
      title: 'Tab A',
      key: 'a',
      content: <h2>Tab A content</h2>,
    },
    {
      title: 'Tab B',
      key: 'b',
      alarm: true,
      content: <h2>Tab B content</h2>,
    },
    {
      title: 'Tab CCCCCCCCC',
      key: 'c',
      content: <h2>Tab C content</h2>,
    },
    {
      title: 'Tab D',
      key: 'd',
      content: <h2>Tab D content</h2>,
    },
    {
      title: 'Tab E',
      key: 'e',
      content: <h2>Tab E content</h2>,
    },
  ];
  return (
    <div>
      <h2 className="guide_tit2">Tabs Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/tabs/tabs.tsx</p>
      <p className="info">
        type: 'fill' | 'line' | 'round' | 'progress' <br />
        variant: 'primary' | 'secondary' | 'gray'
      </p>
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
    {
      title: 'Tab D',
      key: 'd',
      content: <h2>Tab D content</h2>,
    },
    {
      title: 'Tab E',
      key: 'e',
      content: <h2>Tab E content</h2>,
    },
  ];
  
// div 내용이 여러줄일경우 (<></>), 묶어준다.
content: (
  <>
    <div>여러줄일경우</div>
    <div>여러줄일경우</div>
  </>
),

// 적용방법(예시)
<Tabs selectedTabKey={selectedTabKey} items={items} type="fill" />
<Tabs selectedTabKey={selectedTabKey} items={items} type="fill" variant="primary" />
<Tabs selectedTabKey={selectedTabKey} items={items} type="line" />
<Tabs selectedTabKey={selectedTabKey} items={items} type="round" />
<Tabs selectedTabKey={selectedTabKey} items={items} type="segment" />
`}
          </code>
        </pre>
      </div>
      <div className="group">
        {/* <h3 className="guide_tit3">Tabs fill Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items} type="fill" />
          </div>
        </div>
        <h3 className="guide_tit3">Tabs fill(primary) Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items} type="fill" variant="primary" />
          </div>
        </div>
        <h3 className="guide_tit3">Tabs fill(primary, sm) Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs
              selectedTabKey={selectedTabKey}
              items={items}
              type="fill"
              variant="primary"
              size="sm"
            />
          </div>
        </div> */}
        <h3 className="guide_tit3">Tabs line Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items} type="line" />
          </div>
        </div>
        <h3 className="guide_tit3">Tabs line(alarm) Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items2} type="line" variant="gray" />
          </div>
        </div>
        {/* <h3 className="guide_tit3">Tabs round Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items} type="round" />
          </div>
        </div>
        <h3 className="guide_tit3">Tabs progress Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items} type="progress" />
          </div>
        </div>
        <h3 className="guide_tit3">Tabs progress(size : sm) Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs selectedTabKey={selectedTabKey} items={items} type="progress" size="sm" />
          </div>
        </div>
        <h3 className="guide_tit3">Tabs segment(size : sm) Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs items={items} type="segment" size="sm" />
          </div>
        </div>
        <h3 className="guide_tit3">Tabs segment Case</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <Tabs items={items} type="segment" size="md" />
          </div>
        </div> */}
      </div>
    </div>
  );
}
