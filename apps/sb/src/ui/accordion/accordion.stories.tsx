// BaseForm.stories.tsx
import React, { useState } from 'react';
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
    value: getRandomId(),
    title: 'title A',
    children: <div>Content A</div>,
  },
  {
    value: getRandomId(),
    title: 'title B',
    children: <div>Content B</div>,
  },
];

export const AccordionStory: any = (args: any) => {
  const [value, setValue] = useState<string>('');
  return (
    <div className="flex flex-col gap-5">
      <Template {...args} value={value} onValueChange={(value: string) => setValue(value)} />
    </div>
  );
};
AccordionStory.storyName = 'Accordion';
AccordionStory.args = {
  items: dummyItems,
};
