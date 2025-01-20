// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '@learnway/ui';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Avatar>;

const Template: React.FC<any> = (args) => {
  return <Avatar {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const AvatarStory: Story = {
  name: 'Avatar',
  args: {
    imageUrl: 'https://github.com/shadcn.png'
  },
  render: (args) => <Template {...args} />,
};
