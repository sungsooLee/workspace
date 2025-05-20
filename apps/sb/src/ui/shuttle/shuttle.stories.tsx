// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import {
  ShuttleGridToGrid,
  ShuttleTreeToChips,
  ShuttleTreeToGrid,
  TreeBox,
  TreeContainer,
  TreeEventPayload,
  TreeNode,
} from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
// import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Shuttle',
  component: ShuttleGridToGrid,
  tags: ['autodocs'],
  args: {
    // onChange: action('changed'),
  },
  // args: {
  // variant: 'primary',
  // },
} as Meta;

// ShuttleGridToGrid
export const TemplateGridToGrid: any = (args: any) => {
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const gridData = Array(10)
    .fill(null)
    .map((d, i) => ({ id: `id${i}`, name: `name${i}` }));
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Last Name',
      cell: (info) => info.getValue(),
      meta: {
        headerAlign: 'left', // 헤더만 가운데 정렬
        cellAlign: 'center', // 셀은 오른쪽 정렬
      },
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <ShuttleGridToGrid
      gridData={gridData}
      columns={columns}
      rowKey={'id'}
      selectedRows={selectedRows}
      leftTitle={'OOO 목록'}
      rightTitle={'OOO 목록'}
    />
  );
};
TemplateGridToGrid.storyName = 'Grid To Grid';

// ShuttleTreeToGrid
export const TemplateTreeToGrid: any = (args: any) => {
  const treeData = [
    {
      key: 'source-1',
      title: '소스 루트',
      children: [
        {
          key: 'source-1-1',
          title: '드래그 가능 노드',
          children: [
            { key: 'source-1-1-1', title: '일반 노드 1' },
            { key: 'source-1-1-2', title: '일반 노드 2' },
          ],
        },
        {
          key: 'source-1-2',
          title: '드래그 불가 노드',
          constraints: {
            drag: false,
          },
        },
        {
          key: 'source-1-3',
          title: '드롭 불가 노드',
          constraints: {
            drop: false,
          },
        },
      ],
    },
  ];
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Last Name',
      cell: (info) => info.getValue(),
    }),
  ] as ColumnDef<any, unknown>[];
  return <ShuttleTreeToGrid {...args} treeData={treeData} columns={columns} />;
};
TemplateTreeToGrid.storyName = 'Tree To Grid';

// ShuttleTreeToTree
export const TemplateTreeToTree: any = (args: any) => {
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

  const initialTargetData = [
    {
      key: 'target-1',
      title: '타겟 루트 1',

      children: [
        {
          key: 'target-1-1',
          title: '타겟 자식 1',
          children: [
            { key: 'target-1-1-1', title: '타겟 손자 1' },
            { key: 'target-1-1-2', title: '타겟 손자 2' },
          ],
        },
        { key: 'target-1-2', title: '타겟 자식 2' },
      ],
    },
    {
      key: 'target-2',
      title: '타겟 루트 2',
      children: [
        { key: 'target-2-1', title: '타겟 자식 3' },
        { key: 'target-2-2', title: '타겟 자식 4' },
      ],
    },
  ];
  const [sourceData, setSourceData] = useState<TreeNode[]>(sampleData);
  const [targetData, setTargetData] = useState<TreeNode[]>(initialTargetData);
  const handleAction = (payload: TreeEventPayload) => {
    console.log(payload);
    switch (payload.type) {
      case 'NODE_SELECT':
        break;
      case 'NODE_MOVE':
        break;
      case 'NODE_COPY':
        break;
    }
  };

  return (
    <div className="flex gap-8 p-4">
      <TreeContainer>
        <div className="flex-1">
          <h3 className="mb-2 font-semibold">소스 트리</h3>
          <TreeBox
            treeId="source"
            data={sourceData}
            onAction={handleAction}
            type="DRAG_DROP"
            initLevel={2}
            clientTree={true}
            showSearchKeyword
          />
        </div>
        <div className="flex-1">
          <h3 className="mb-2 font-semibold">타겟 트리</h3>
          <TreeBox
            treeId="target"
            data={targetData}
            onAction={handleAction}
            type="DRAG_DROP"
            initLevel={2}
            clientTree={true}
            showSearchKeyword
          />
        </div>
      </TreeContainer>
    </div>
  );
};
TemplateTreeToTree.storyName = 'Tree To Tree';

// ShuttleTreeToChips
export const TemplateTreeToChips = () => {
  const treeData = [
    {
      key: 'source-1',
      title: '소스 루트',
      children: [
        {
          key: 'source-1-1',
          title: '드래그 가능 노드',
          children: [
            { key: 'source-1-1-1', title: '일반 노드 1' },
            { key: 'source-1-1-2', title: '일반 노드 2' },
          ],
        },
        {
          key: 'source-1-2',
          title: '드래그 불가 노드',
          constraints: {
            drag: false,
          },
        },
        {
          key: 'source-1-3',
          title: '드롭 불가 노드',
          constraints: {
            drop: false,
          },
        },
      ],
    },
  ];

  const [selectedItems, setSelectedItems] = useState<{ key: string; fullPath: string }[]>([]);

  return (
    <ShuttleTreeToChips
      treeId="api-list-tree"
      title="TITLE"
      sourceData={treeData as TreeNode[]}
      selectedItems={selectedItems}
      onItemsChange={setSelectedItems}
    />
  );
};
TemplateTreeToChips.storyName = 'Tree To Chips';
