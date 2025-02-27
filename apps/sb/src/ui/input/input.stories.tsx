/* eslint-disable @nx/enforce-module-boundaries */
// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@learnway/ui';

export default {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: {},
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Input>;

// Text
export const Template: any = (args: any) => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  return (
    <div className={'flex flex-col gap-3'}>
      <Input {...args} onChange={handleChange} />
      <Input {...args} unitText={'명'} onChange={handleChange} />
      <Input {...args} showCounter onChange={handleChange} />
      <Input {...args} unitText={'명'} showCounter onChange={handleChange} />
      <Input {...args} showSearchIcon onEnterKeyDown={() => console.log('enter')} />
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
      <Input {...args} value={value} onChange={handleChange} />
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
  return <Input {...args} type="number" onChange={handleChange} />;
};
TemplateNumber.storyName = 'Number';
TemplateNumber.args = {};

// Mask
export const TemplateMask: any = (args: any) => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  return (
    <Input {...args} type="mask" mask={'_'} format={'###-####-####'} onChange={handleChange} />
  );
};
TemplateMask.storyName = 'Mask';
TemplateMask.args = {};
