// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Carousel, ImageCarousel, Tabs } from '@learnway/ui';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Carousel>;

const Template: React.FC<any> = (args) => {
  return (
    <div className="w-[500px] h-[200px] bg-amber-300 border-solid">
      <Carousel {...args} />
    </div>
  )
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const CarouselStory: Story = {
  name: 'Carousel',
  args: {
    items: [
      (<h3>item A</h3>),
      (<h3>item B</h3>),
      (<h3>item C</h3>),
    ]
    // imageUrls: ['a.png', 'b.png', 'c.png', 'd.png', 'e.png']
  },
  render: (args) => <Template {...args} />,
};

export const TemplateImage: any = (args: any) => {
  return (
    <div className="w-[500px] h-[200px] bg-amber-300 border-solid">
      <ImageCarousel {...args} />
    </div>
  )
}
TemplateImage.storyName = 'Image Carousel';
TemplateImage.args = {
  imageUrls: ['https://github.com/shadcn.png', 'https://github.com/shadcn.png', 'https://github.com/shadcn.png', 'https://github.com/shadcn.png'],
};
