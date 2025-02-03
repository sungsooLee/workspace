// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Pagination } from '@learnway/ui';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

export const Template: any = (args: any) => {
  return (
    <div className="flex flex-col gap-5">
      <Pagination pageSize={20} pageNumber={1} />
    </div>
  )
}
Template.storyName = 'Basic';
Template.args = {
};
