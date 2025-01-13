// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@learnway/ui';

export default {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Radio>;

const BaseWrapper: React.FC<any> = (args) => {
  return <Radio {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const RadioStory: Story = {
  name: 'Radio',
  args: {
    options: Array(5).fill(null).map((d, i) => ({value: `value${i}`, label: `label${i}`}))
  },
  render: (args) => <BaseWrapper {...args} />,
};
