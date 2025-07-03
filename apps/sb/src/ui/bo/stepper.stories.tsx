// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { SelectOption, Stepper } from '@learnway/ui';

export default {
  title: 'Bo-Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (Story) => (
      <div style={{ minWidth: '1000px', width: '100%', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

// Stepper
export const Template: any = (args: any) => {
  const items = [
    { label: '스텝 1', subLabel: 'sub label', value: 'step1' },
    { label: '스텝 2', subLabel: 'sub label', value: 'step2' },
    { label: '스텝 3', subLabel: 'sub label', value: 'step3' },
    { label: '스텝 4', subLabel: 'sub label', value: 'step4' },
    { label: '스텝 5', subLabel: 'sub label', value: 'step5' },
  ];
  const handleChange = (event: SelectOption) => {
    console.log(event);
  };
  return <Stepper items={items} enableMoveStep onChange={handleChange} variant="number" />;
};
Template.storyName = 'Stepper';
Template.args = {};
