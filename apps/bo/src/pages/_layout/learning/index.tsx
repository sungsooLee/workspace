import { createFileRoute } from '@tanstack/react-router'

import styles from './index.module.css';
import { cn } from '@learnway/shared';
import { Panel } from '@learnway/ui';

export const Route = createFileRoute('/_layout/learning/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <LearningSamplePage />
  )
}

export const LearningSamplePage = () => {
  return (
    <div className={cn(styles.root, 'grid grid-cols-10 h-64 gap-4')}>
      <div className="col-span-7 bg-gray-2 p-4">
        <Panel className="col-span-7 bg-gray-2 p-4" title={'기본정보'}></Panel>
      </div>
      <div className="col-span-3 bg-gray-2 p-4">
        <div className={"grid grid-rows-3"}>
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
  )
};


