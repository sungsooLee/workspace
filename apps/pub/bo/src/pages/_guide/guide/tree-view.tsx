import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { TreeView, TreeNode } from '@learnway/ui';

const sampleData: TreeNode[] = [
  {
    key: '1',
    title: 'Root Node 1',
    isUsed: false,
    children: [
      {
        key: '1-1',
        title: 'Child 1',
        isUsed: true,
        children: [
          { key: '1-1-1', title: 'Grandchild 1', isUsed: true },
          { key: '1-1-2', title: 'Grandchild 2', isUsed: false },
        ],
      },
      { key: '1-2', title: 'Child 2', isUsed: true },
    ],
  },
  {
    key: '2',
    title: 'Root Node 2',
    isUsed: false,
    children: [
      { key: '2-1', title: 'Child 3', isUsed: false },
      { key: '2-2', title: 'Child 4', isUsed: false },
    ],
  },
];

export const Route = createFileRoute('/_guide/guide/tree-view')({
  component: RouteComponent,
});

function RouteComponent() {
  const [sourceData, setSourceData] = useState<TreeNode[]>(sampleData);
  return (
    <div>
      <h2 className="guide_tit2">Tree Component Guide</h2>
      <p className="loc react">/libs/ui/src/lib/tree-view/tree.tsx</p>
      <div className="code_example">
        <pre className="code_block">
          <code>
            {`// 초기 import
  import { Button, Tooltip } from '@learnway/ui';
  import { IcoAlertCircle } from '@learnway/icons'; // 아이콘
  
  // 적용방법(예시)
  <Tooltip side="top" align="end" content={'tooltip content'}>
    <Button onlyIcon>
      <IcoAlertCircle width={16} height={17} fill="#A9AFB8" />
    </Button>
  </Tooltip>
  `}
          </code>
        </pre>
      </div>
      <div className="group">
        <h3 className="guide_tit3">Basic</h3>
        <div className="flex_box">
          <div className="desc w-full">
            <TreeView treeId="source" data={sourceData} type={'DRAG_DROP'} />
          </div>
        </div>
      </div>
    </div>
  );
}
