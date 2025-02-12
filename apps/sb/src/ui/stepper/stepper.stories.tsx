// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
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
    { label: '스텝 1', subLabel: 'help label', value: 'step1' },
    { label: '스텝 2', subLabel: 'help label', value: 'step2' },
    { label: '스텝 3', subLabel: 'help label', value: 'step3' },
    { label: '스텝 4', subLabel: 'help label', value: 'step4' },
    { label: '스텝 5', subLabel: 'help label', value: 'step5' },
  ];
  const handleChange = (event: SelectOption) => {
    console.log(event);
  };
  return <Stepper items={items} enableMoveStep onChange={handleChange} />;
};
Template.storyName = 'Stepper';
Template.args = {};
