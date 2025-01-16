// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@learnway/ui';
import { Camera } from 'lucide-react';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Button>;

const Template: React.FC<any> = (args) => {
  return <Button {...args}>Button</Button>;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const ButtonStory: Story = {
  name: 'Button',
  args: {
  },
  render: (args) => <Template {...args} />,
};

export const LoadingButton: Story = {
  args: {
    isLoading: true,
  },
  render: (args) => <Template {...args} />,
}

export const IconButton: Story = {
  args: {
    icon: <Camera />,
  },
  render: (args) => <Template {...args} />,
}
