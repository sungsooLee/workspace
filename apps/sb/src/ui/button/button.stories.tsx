// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@learnway/ui';
import { Camera } from 'lucide-react';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Button>;

const BaseWrapper: React.FC<any> = (args) => {
  return <Button {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const ButtonStory: Story = {
  name: 'Button',
  args: {
    label: 'Button',
  },
  render: (args) => <BaseWrapper {...args} />,
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const ImageButtonStory: Story = {
  name: 'Loading Button',
  args: {
    label: 'Label',
    isLoading: true,
  },
  render: function Render(args) {
    return (
      <div>
        <div className="flex gap-4 p-4">
          <BaseWrapper {...args} />
        </div>
      </div>
    )
  }
}

export const IconButtonStory: Story = {
  name: 'Icon Button',
  args: {
    label: 'Label',
    icon: <Camera />,
  },
  render: function Render(args) {
    return (
      <BaseWrapper {...args} />
    )
  }
}
