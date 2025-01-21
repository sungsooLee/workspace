// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@learnway/ui';

export default {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Textarea>;

const Template: React.FC<any> = (args) => {
  return (
    <Textarea {...args} rows={5} cols={33} />
  )
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const Text: Story = {
  args: {
  },
  render: (args) => <Template {...args} />,
};
