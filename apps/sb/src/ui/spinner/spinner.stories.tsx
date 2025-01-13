// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@learnway/ui';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Spinner>;

const BaseWrapper: React.FC<any> = (args) => {
  return <Spinner {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const SpinnerStory: Story = {
  name: 'Spinner',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};
