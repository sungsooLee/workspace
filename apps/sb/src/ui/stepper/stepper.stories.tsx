// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectOption, Stepper } from '@learnway/ui';

export default {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;

// Stepper
export const Template: any = (args: any) => {
  const items = [
    {label: '스텝 1', value: 'step1'},
    {label: '스텝 2', value: 'step2'},
    {label: '스텝 3', value: 'step3'},
    {label: '스텝 4', value: 'step4'},
    {label: '스텝 5', value: 'step5'},
  ]
  const handleChange = (event: SelectOption) => {
    console.log(event)
  }
  return <Stepper items={items} onChange={handleChange} />;
}
Template.storyName = 'Stepper';
Template.args = {};

