// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, RadioCard, ToastWrapper, useToast } from '@learnway/ui';

export default {
  title: 'Components/RadioGroup',
  component: RadioCard,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof RadioCard>;

export const Template: any = (args: any) => {
  return (
    <div className="bg-gray-1 flex h-[300px] w-[500px] flex-col gap-5">
      <RadioCard
        disabled={true}
        defaultValue="value0"
        options={Array(5)
          .fill(null)
          .map((d, i) => ({ value: `value${i}`, label: `label${i}` }))}
      />
    </div>
  );
};
Template.storyName = 'RadioCard';
Template.args = {};

export const TemplateValueControl: any = (args: any) => {
  const [value, setValue] = useState<string>('value0');
  return (
    <>
      <div className="flex space-x-5">
        <Button onClick={() => setValue('value2')}>select label 2</Button>
        <Button onClick={() => setValue('')}>reset</Button>
      </div>
      <div className="h-10"></div>
      <RadioCard
        {...args}
        value={value}
        options={Array(5)
          .fill(null)
          .map((d, i) => ({ value: `value${i}`, label: `label${i}` }))}
        onValueChange={(selectedValue: any) => setValue(selectedValue)}
      />
    </>
  );
};
TemplateValueControl.storyName = 'Value Control';
TemplateValueControl.args = {};
