// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '@learnway/ui';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Sidebar>;

const BaseWrapper: React.FC<any> = (args) => {
  return (
    <Sidebar {...args}>
      <div>
        <span>XXX</span>
      </div>
    </Sidebar>
  )
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const SidebarStory: Story = {
  name: 'Sidebar',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};
