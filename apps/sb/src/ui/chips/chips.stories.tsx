// BaseForm.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chips, Radio, SelectOption } from '@learnway/ui';

export default {
  title: 'Components/Chips',
  component: Chips,
  tags: ['autodocs'],
  args: {
    // variant: 'primary',
    // size: 'md'
    prefixCharacter: '#'
  },
} as Meta;

// Chips
export const Template: any = (args: any) => {
  return (
    <Chips {...args} label="현대자동차">Chips</Chips>
  )
}
Template.storyName = 'Chips';
Template.args = {};


// Handle Delete
export const TemplateDelete: any = (args: any) => {
  const handleClick = (event: React.MouseEvent) => {
    console.log('handleClick', event);
  }
  const handleDelete = (event: SelectOption) => {
    console.log('handleDelete', event);
  }
  return (
    <Chips {...args} label="현대자동차" value="H" onClick={handleClick} onDelete={handleDelete}>Chips</Chips>
  )
}
TemplateDelete.storyName = 'Handle Delete';
TemplateDelete.args = {};

