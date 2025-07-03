// BaseForm.stories.tsx
import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { ShuttleGridToGrid, ShuttleTreeToChips, TreeNode, TreeToTree } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import i18n from 'i18next';

i18n.init({
  lng: 'ko',
  fallbackLng: 'ko',
  resources: {
    ko: {
      translation: {
        'LABEL.tree.expand': '전체펼침',
        'LABEL.tree.closed': '전체닫기',
      },
    },
    en: {
      translation: {
        'LABEL.tree.expand': 'Expand All',
        'LABEL.tree.closed': 'Collapse All',
      },
    },
  },
});

export default {
  title: 'Bo-Components/Shuttle',
  component: ShuttleGridToGrid,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <div style={{ minWidth: '900px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

// ShuttleGridToGrid
export const TemplateGridToGrid: any = (args: any) => {
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
      leftTitle={'OOO 목록'}
      rightTitle={'OOO 목록'}
      onSelectedChange={(selectedRows: any) => console.log(selectedRows)}
    />
  );
};
TemplateGridToGrid.storyName = 'Grid To Grid';

const sampleSourceData: TreeNode[] = [
  {
    key: 'root-1',
    title: 'Frontend Development',
    children: [
      {
        key: 'frontend-1',
        title: 'React',
        children: [
          { key: 'react-1', title: 'Hooks' },
          { key: 'react-2', title: 'Context API' },
          { key: 'react-3', title: 'Redux' },
        ],
      },
      {
        key: 'root-2',
        title: 'Backend Development',
        children: [
          { key: 'python-1', title: 'Django' },
          { key: 'python-2', title: 'FastAPI' },
        ],
      },
    ],
  },
];

const sampleTargetData: TreeNode[] = [
  {
    key: 'target-root-1',
    title: 'My Learning Path',
    children: [
      { key: 'react-2', title: 'Context API' },
      // { key: 'python-2', title: 'FastAPI' },
    ],
  },
];
const TreeToTreeComponent = (args: any) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(['react-2']);
  return (
    // <div style={{ padding: '20px', width: '100%' }}>
    <TreeToTree {...args} selectedItems={selectedItems} onItemsChange={setSelectedItems} />
    // </div>
  );
};

export const TreeToTreeStory = {
  name: 'Tree-To-Tree',
  render: (args: any) => <TreeToTreeComponent {...args} />,
  args: {
    sourceTreeId: 'source-tree',
    targetTreeId: 'target-tree',
    sourceData: sampleSourceData,
    targetData: sampleTargetData,
    sourceTitle: 'Source Tree',
    targetTitle: 'Target Tree',
  },
};

// ShuttleTreeToChips
export const TemplateTreeToChips = () => {
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
        {
          key: '1-2',
          title: 'Child 2',
          isUsed: true,
          children: [
            { key: '2-1', title: 'Child 3', isUsed: false },
            { key: '2-2', title: 'Child 4', isUsed: false },
          ],
        },
      ],
    },
  ];

  const [selectedItems, setSelectedItems] = useState<{ key: string; fullPath: string }[]>([]);

  return (
    <ShuttleTreeToChips
      treeId="api-list-tree"
      title="source"
      targetTitle="target"
      sourceData={sampleData as TreeNode[]}
      selectedItems={selectedItems}
      onItemsChange={setSelectedItems}
      initLevel={2}
      displayKey="title"
    />
  );
};
TemplateTreeToChips.storyName = 'Tree To Chips';
