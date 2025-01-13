// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormDatePicker as DatePicker } from '@learnway/ui';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof DatePicker>;

const BaseWrapper: React.FC<any> = (args) => {
  return <DatePicker {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const DatePickerStory: Story = {
  name: 'DatePicker',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};
