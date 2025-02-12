/* eslint-disable @nx/enforce-module-boundaries */
// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from '@learnway/ui';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof NumberInput>;

// Text
export const Template: any = (args: any) => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  return (
    <div className={'flex flex-col gap-3'}>
      <NumberInput {...args} onChange={handleChange} />
      <NumberInput {...args} unitText={'명'} onChange={handleChange} />
      <NumberInput {...args} showCounter onChange={handleChange} />
      <NumberInput {...args} unitText={'명'} showCounter onChange={handleChange} />
    </div>
  );
};
Template.storyName = 'Text';
Template.args = {};

// Text
export const TemplateValueControl: any = (args: any) => {
  const [value, setValue] = React.useState('');
  const handleChange = (value: any) => {
    console.log(value);
  };
  return (
    <div className={'flex flex-col gap-3'}>
      <button onClick={() => setValue('XX')}>Set</button>
      <NumberInput {...args} value={value} onChange={handleChange} />
    </div>
  );
};
TemplateValueControl.storyName = 'Value Control';
TemplateValueControl.args = {};

// Number
export const TemplateNumber: any = (args: any) => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  return <NumberInput {...args} type="number" onChange={handleChange} />;
};
TemplateNumber.storyName = 'Number';
TemplateNumber.args = {};

// Mask
export const TemplateMask: any = (args: any) => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  return (
    <NumberInput
      {...args}
      type="mask"
      mask={'_'}
      format={'###-####-####'}
      onChange={handleChange}
    />
  );
};
TemplateMask.storyName = 'Mask';
TemplateMask.args = {};
