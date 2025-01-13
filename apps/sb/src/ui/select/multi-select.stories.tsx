// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from '@learnway/ui';

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof MultiSelect>;

const BaseWrapper: React.FC<any> = (args) => {
  return <MultiSelect {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const MultiSelectStory: Story = {
  name: 'MultiSelect',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};
