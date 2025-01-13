// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@learnway/ui';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Checkbox>;

const BaseWrapper: React.FC<any> = (args) => {
  return <Checkbox {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const CheckboxStory: Story = {
  name: 'Checkbox',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};
