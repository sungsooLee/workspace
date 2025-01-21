// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@learnway/ui';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Tooltip>;

const Template: React.FC<any> = (args) => {
  return (
    <Tooltip {...args} content={'tooltip content'}>
      <button>Button</button>
    </Tooltip>
  )
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const Text: Story = {
  args: {
  },
  render: (args) => <Template {...args} />,
};

const ReactNodeTemplate: React.FC<any> = (args) => {
  const Content = () => (
    <div className="w-80">
      <h3 className="bg-green-50">Content Header</h3>
      <h4 className="bg-gray-3 h-20">Content Body</h4>
    </div>
  )
  return (
    <Tooltip {...args} content={<Content />}>
      <button>Open Tooltip</button>
    </Tooltip>
  )
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const ReactNode: Story = {
  args: {
  },
  render: (args) => <ReactNodeTemplate {...args} />,
};
