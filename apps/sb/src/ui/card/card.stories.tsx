// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@learnway/ui';

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Card>;

const BaseWrapper: React.FC<any> = (args) => {
  return <Card {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const CardStory: Story = {
  name: 'Card',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};
