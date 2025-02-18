// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Carousel, Tabs } from '@learnway/ui';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Carousel>;

const Template: React.FC<any> = (args) => {
  return (
    <div className="h-[200px] w-[500px] border-solid bg-amber-300">
      <Carousel {...args} />
    </div>
  );
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const CarouselStory: Story = {
  name: 'Carousel',
  args: {
    items: [<h3>item A</h3>, <h3>item B</h3>, <h3>item C</h3>],
    // imageUrls: ['a.png', 'b.png', 'c.png', 'd.png', 'e.png']
  },
  render: (args) => <Template {...args} />,
};
