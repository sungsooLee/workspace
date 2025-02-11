// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Switch } from '@learnway/ui';

export default {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: {
    labelAlign: 'left',
  },
  argTypes: {},
} as Meta;

// Switch
export const Template: any = (args: any) => {
  return <Switch {...args} />;
}
Template.storyName = 'Switch';
Template.args = {};
