// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, RadioGroup, ToastWrapper, useToast } from '@learnway/ui';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof RadioGroup>;

export const Template: any = (args: any) => {
  return (
    <div className="bg-gray-1 flex h-[300px] w-[500px] flex-col gap-5">
      <RadioGroup
        disabled={true}
        defaultValue="value0"
        options={Array(5)
          .fill(null)
          .map((d, i) => ({ value: `value${i}`, label: `label${i}` }))}
      />
    </div>
  );
};
Template.storyName = 'RadioGroup';
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
      <RadioGroup
        {...args}
        value={value}
        options={Array(5)
          .fill(null)
          .map((d, i) => ({ value: `value${i}`, label: `label${i}` }))}
        onValueChange={(selectedValue) => setValue(selectedValue)}
      />
    </>
  );
};
TemplateValueControl.storyName = 'Value Control';
TemplateValueControl.args = {};
