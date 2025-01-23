// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@learnway/ui';

export default {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Progress>;

const Template: React.FC<any> = (args) => {
  return (
    <Progress {...args} />
  )
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const ProgressStory: Story = {
  name: 'Progress',
  args: {
    value: 50,
  },
  render: (args) => <Template {...args} />,
};
