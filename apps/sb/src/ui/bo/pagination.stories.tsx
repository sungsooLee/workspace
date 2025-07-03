// BaseForm.stories.tsx
import React, { useEffect } from 'react';
import type { Meta } from '@storybook/react';
import { Button, Pagination } from '@learnway/ui';

export default {
  title: 'Bo-Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

export const Template: any = (args: any) => {
  const [page, setPage] = React.useState(0);
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(args.pageNumber);
  }, [args.pageNumber]);
  return (
    <div className="flex flex-col gap-5">
      <Pagination
        {...args}
        pageNumber={page}
        totalPages={args.totalPages}
        onChange={handlePageChange}
      />
    </div>
  );
};
Template.storyName = 'Basic';
Template.args = {
  pageSize: 20,
  totalPages: 100,
  pageNumber: 0,
};
