// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageCarousel } from '@learnway/ui';

export default {
  title: 'Components/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof ImageCarousel>;

const BaseWrapper: React.FC<any> = (args) => {
  return <ImageCarousel {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const ImageCarouselStory: Story = {
  name: 'ImageCarousel',
  args: {
    imageUrls: ['a.png', 'b.png', 'c.png', 'd.png', 'e.png']
  },
  render: (args) => <BaseWrapper {...args} />,
};
