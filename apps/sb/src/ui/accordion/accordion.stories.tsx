// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@learnway/ui';
import { getRandomId } from '@learnway/shared';

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

const dummyItems = [
  {
    key: getRandomId(),
    title: 'title A',
    children: (
      <Template items={[{key: getRandomId(), title: 'title A1', children: 'A1 Content'}]} />
    )
  },
  {
    key: getRandomId(),
    title: 'title B',
    children: (
      <Template items={[{key: getRandomId(), title: 'title B1', children: 'B1 Content'}]} />
    )
  },
]
// Name 충돌로 Story 명에 suffix(***Story) 붙임 (정책 정해지면 수정 필요)
export const AccordionStory: Story = {
  name: 'Accordion',
  args: {
    items: dummyItems
  },
  render: (args) => <Template {...args} />,
};

