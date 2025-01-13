// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormSelect as Select } from '@learnway/ui';

export default {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Select>;

const BaseWrapper: React.FC<any> = (args) => {
  return <Select {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const SelectStory: Story = {
  name: 'Select',
  args: {
    options: Array(5).fill(null).map((d, i) => ({value: `value${i}`, label: `label${i}`}))
  },
  render: (args) => <BaseWrapper {...args} />,
};
