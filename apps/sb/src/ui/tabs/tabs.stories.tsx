// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '@learnway/ui';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Tabs>;

const Template: React.FC<any> = (args) => <Tabs {...args} />;

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const TabsStory: Story = {
  name: 'Tabs',
  args: {
    items: [
      {
        title: 'Tab A',
        key: 'a',
        content: (
          <h2>Tab A content</h2>
        )
      },
      {
        title: 'Tab B',
        key: 'B',
        content: (
          <h2>Tab B content</h2>
        )
      },
      {
        title: 'Tab C',
        key: 'c',
        content: (
          <h2>Tab C content</h2>
        )
      }
    ],
  },
  render: (args) => <Template {...args} />,
};
