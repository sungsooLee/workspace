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

// Number
export const Template: any = (args: any) => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  return <NumberInput {...args} onChange={handleChange} />;
};
Template.storyName = 'Text';
Template.args = {};

// Number
export const TemplateNumber: any = (args: any) => {
  const handleChange = (value: any) => {
    console.log(value);
  };
  return <NumberInput {...args} numeric onChange={handleChange} />;
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
      mask={'_'}
      format={'###-####-####'}
      allowEmptyFormatting
      onChange={handleChange}
    />
  );
};
TemplateMask.storyName = 'Mask';
TemplateMask.args = {};
