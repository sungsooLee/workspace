// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@learnway/ui';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {},
} as Meta;
type Story = StoryObj<typeof Spinner>;

export const Template: any = (args: any) => {
  return <Spinner {...args} isLoading={true} showBackdrop />;
};
Template.storyName = 'Spinner';
Template.args = {};
