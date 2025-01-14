// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@learnway/ui';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Button>;

const BaseWrapper: React.FC<any> = (args) => {
  return <Button {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const ButtonStory: Story = {
  name: 'Button',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};
