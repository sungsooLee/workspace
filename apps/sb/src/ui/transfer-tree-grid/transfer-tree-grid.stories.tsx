// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { TransferTreeGrid } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
// import { action } from '@storybook/addon-actions';

const dummyData = [
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

export default {
  title: 'Components/TransferTreeGrid',
  component: TransferTreeGrid,
  tags: ['autodocs'],
  args: {
    // onChange: action('changed'),
  },
  // args: {
  // },
} as Meta;

// TransferTreeGrid
export const Template: any = (args: any) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Last Name',
      cell: (info) => info.getValue(),
    }),
  ] as ColumnDef<any, unknown>[];
  return <TransferTreeGrid {...args} treeData={dummyData} columns={columns} />;
};
Template.storyName = 'TransferTreeGrid';
