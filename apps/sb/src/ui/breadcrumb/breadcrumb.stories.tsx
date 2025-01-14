// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from '@learnway/ui';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Breadcrumb>;

const BaseWrapper: React.FC<any> = (args) => {
  return <Breadcrumb {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const BreadcrumbStory: Story = {
  name: 'Breadcrumb',
  args: {},
  render: (args) => <BaseWrapper {...args} />,
};
