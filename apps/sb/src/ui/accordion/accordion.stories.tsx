// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@learnway/ui';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Accordion>;

const Template: React.FC<any> = (args) => {
  return <Accordion {...args} />;
};

// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const AccordionStory: Story = {
  name: 'Accordion',
  args: {
    items: [
      {key: 'key1', title: 'title', children: 'Content'},
      {key: 'key2', title: 'title', children: 'Content'},
      {key: 'key3', title: 'title', children: 'Content'},
    ]
  },
  render: (args) => <Template {...args} />,
};
