import { createFileRoute } from '@tanstack/react-router';

import styles from './index.module.css';
import { cn } from '@learnway/shared';
import { Button, Panel } from '@learnway/ui';
import React from 'react';

export const Route = createFileRoute('/_layout/learning/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [collapsedPanel, setCollapsedPanel] = React.useState(true);
  return (
    <div className={cn(styles.root, 'grid h-64 grid-cols-10 gap-4')}>
      <div className="col-span-7 p-4">
        <Panel className="col-span-7 p-4" title={'기본정보'}>
          기본정보 Panel Content
        </Panel>
        <Button variant={'primary'} size={'md'} onClick={() => setCollapsedPanel(!collapsedPanel)}>
          {collapsedPanel ? '전체 닫기' : '전체 펼치기'}
        </Button>
        <Panel className="col-span-7 p-4" title={'Panel A'} collapsible collapsed={collapsedPanel}>
          A Panel Content
        </Panel>
        <Panel className="col-span-7 p-4" title={'Panel B'} collapsible collapsed={collapsedPanel}>
          B Panel Content
        </Panel>
        <Panel className="col-span-7 p-4" title={'Panel C'} collapsible collapsed={collapsedPanel}>
          C Panel Content
        </Panel>
      </div>
      <div className="col-span-3 p-4">
        <div className={'grid grid-rows-3'}>
          <div className="col-rows-1 bg-amber-300 p-4">
            <Panel title={'교육자원연결'}></Panel>
          </div>
          <div className="col-rows-1 bg-amber-500 p-4">
            <Panel title={'차수관리'}></Panel>
          </div>
          <div className="col-rows-1 bg-emerald-300 p-4">
            <Panel title={'연관업무'}></Panel>
          </div>
        </div>
        {/*<Panel title={''}></Panel>*/}
      </div>
    </div>
  );
}
