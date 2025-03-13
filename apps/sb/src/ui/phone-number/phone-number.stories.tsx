// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PhoneNumber } from '@learnway/ui';

export default {
  title: 'Components/PhoneNumber',
  component: PhoneNumber,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof PhoneNumber>;

const Template: React.FC<any> = (args) => {
  const Content = () => (
    <div className="w-80">
      <h3 className="bg-green-50">Content Header</h3>
      <h4 className="bg-gray-3 h-20">Content Body</h4>
    </div>
  );
  return (
    <PhoneNumber {...args} popoverContent={<Content />}>
      <button>Open PhoneNumber</button>
    </PhoneNumber>
  );
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const UserClick: Story = {
  args: {},
  render: (args) => <Template {...args} />,
};
