// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Radio, ToastWrapper, useToast } from '@learnway/ui';

export default {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Radio>;

export const Template: any = (args: any) => {
  return (
    <div className="flex flex-col gap-5 w-[500px] h-[300px] bg-gray-1">
      <Radio
        disabled={true}
        defaultValue='value0'
        options={Array(5).fill(null).map((d, i) => ({value: `value${i}`, label: `label${i}`}))}
      />
    </div>
  )
}
Template.storyName = 'Radio';
Template.args = {};


export const TemplateValueControl: any = (args: any) => {
  const [value, setValue] = useState<string>('value0');
  return (
    <>
      <div className='flex space-x-5'>
        <Button onClick={() => setValue('value2')}>select label 2</Button>
        <Button onClick={() => setValue('')}>reset</Button>
      </div>
      <div className='h-10'></div>
      <Radio
        {...args}
        value={value}
        options={Array(5).fill(null).map((d, i) => ({value: `value${i}`, label: `label${i}`}))}
        onValueChange={(selectedValue) => setValue(selectedValue)}
      />
    </>
  )
}
TemplateValueControl.storyName = 'Value Control';
TemplateValueControl.args = {};
