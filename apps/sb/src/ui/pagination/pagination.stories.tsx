// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Button, Pagination, ToastWrapper } from '@learnway/ui';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

export const Template: any = (args: any) => {
  return (
    <div className="flex flex-col gap-5">
      <Pagination count={100} />
    </div>
  )
}
Template.storyName = 'Basic';
Template.args = {
};

export const TemplatePageControl: any = (args: any) => {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  return (
    <div className="flex flex-col gap-5 bg-gray-1">
      <div className="flex flex-row gap-5">
        <Button onClick={() => setPage(10)}>move 10 page</Button>
      </div>
      <Pagination count={100} page={page} onChange={handlePageChange} />
    </div>
  )
}
TemplatePageControl.storyName = 'Page Control';
TemplatePageControl.args = {
};
