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
  // size: 'md'
  // prefixCharacter: '#',
  // },
} as Meta;

// TransferGrid
export const Template: any = (args: any) => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Last Name',
      cell: (info) => info.getValue(),
    }),
  ] as ColumnDef<any, unknown>[];
  return (
    <TransferGrid
      {...args}
      gridData={dummyData}
      columns={columns}
      rowKey={'id'}
      leftTitle={'강사 목록'}
      rightTitle={'선택 목록'}
    />
  );
};
Template.storyName = 'TransferGrid';
