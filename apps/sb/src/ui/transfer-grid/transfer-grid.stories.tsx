// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { TransferGrid } from '@learnway/ui';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
// import { action } from '@storybook/addon-actions';

const dummyData = Array(10)
  .fill(null)
  .map((d, i) => ({ id: `id${i}`, name: `name${i}` }));

export default {
  title: 'Components/TransferGrid',
  component: TransferGrid,
  tags: ['autodocs'],
  args: {
    // onChange: action('changed'),
  },
  // args: {
  // variant: 'primary',
  // },
} as Meta;

// TransferGrid
export const Template: any = (args: any) => {
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
    <TransferGrid
      {...args}
      gridData={dummyData}
      columns={columns}
      rowKey={'id'}
      leftTitle={'OOO 목록'}
      rightTitle={'OOO 목록'}
    />
  );
};
Template.storyName = 'TransferGrid';
