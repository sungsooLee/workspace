// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@learnway/ui';
import { Camera } from 'lucide-react';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    // variant: 'primary',
    // size: 'md'
  },
} as Meta;

// Button
export const Template: any = (args: any) => {
  return <Button {...args}>Button</Button>;
};
Template.storyName = 'Button';
Template.args = {};

// Loading Button
export const TemplateLoading: any = (args: any) => {
  return (
    <Button {...args} isLoading={true}>
      Button
    </Button>
  );
};
TemplateLoading.storyName = 'Loading Button';
TemplateLoading.args = {};

// Icon Button
export const TemplateIcon: any = (args: any) => {
  return (
    <Button {...args} icon={<Camera />}>
      Button
    </Button>
  );
};
TemplateIcon.storyName = 'Icon Button';
TemplateIcon.args = {};
