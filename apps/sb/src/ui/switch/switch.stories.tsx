// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@learnway/ui';

export default {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Switch>;

const BaseWrapper: React.FC<any> = (args) => {
  return <Switch {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const SwitchStory: Story = {
  name: 'Switch',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};
