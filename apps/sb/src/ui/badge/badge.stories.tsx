import React from 'react';
import type { Meta } from '@storybook/react';
import { Badge } from '@learnway/ui';

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    variant: 'number',
    size: 'md',
    status: 'primary',
  },
} as Meta;

// Badge
export const Template: any = (args: any) => {
  return <Badge {...args} option={{ label: 'html', value: 'html' }} />;
};
Template.storyName = 'Badge';
Template.args = {};
