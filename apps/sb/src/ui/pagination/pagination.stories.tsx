// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Button, Pagination } from '@learnway/ui';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

export const Template: any = (args: any) => {
  return (
    <div className="flex flex-col gap-5">
      <Pagination totalPages={100} />
    </div>
  );
};
Template.storyName = 'Basic';
Template.args = {};

export const TemplatePageControl: any = (args: any) => {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (value: number) => {
    setPage(value);
  };
  return (
    <div className="bg-gray-1 flex flex-col gap-5">
      <div className="flex flex-row gap-5">
        <Button onClick={() => setPage(10)}>move 10 page</Button>
      </div>
      <Pagination totalPages={100} pageNumber={page} onChange={handlePageChange} />
    </div>
  );
};
TemplatePageControl.storyName = 'Page Control';
TemplatePageControl.args = {};
