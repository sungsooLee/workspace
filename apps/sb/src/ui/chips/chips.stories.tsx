// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { ChipList, Chips, SelectOption } from '@learnway/ui';

export default {
  title: 'Components/Chips',
  component: Chips,
  tags: ['autodocs'],
  args: {
    // variant: 'primary',
    // size: 'md'
    prefixCharacter: '#',
  },
} as Meta;


// Chips
export const Template: any = (args: any) => {
  return (
    <Chips {...args} option={{label: '현대자동차', value: 'H'}}>Chips</Chips>
  )
}
Template.storyName = 'Chips';
Template.args = {};


// Handle Delete
export const TemplateDelete: any = (args: any) => {
  const handleClick = (event: SelectOption) => {
    alert('click event')
    alert(JSON.stringify(event))
  }
  const handleDelete = (event: SelectOption) => {
    alert('delete event')
    alert(JSON.stringify(event))
  }
  return (
    <Chips {...args} option={{label: '현대자동차', value: 'H'}} onClick={() => handleClick({label: '현대자동차', value: 'H'})} onDelete={handleDelete}>Chips</Chips>
  )
}
TemplateDelete.storyName = 'Handle Delete';
TemplateDelete.args = {};



// Handle Delete
export const TemplateList: any = (args: any) => {
  const options: SelectOption[] = [
    {label: '현대자동차 A', value: 'A'},
    {label: '현대자동차 B', value: 'B'},
    {label: '현대자동차 C', value: 'C'},
    {label: '현대자동차 D', value: 'E'},
    {label: '현대자동차 F', value: 'F'},
  ];
  const handleChange = (event: SelectOption[]) => {
    console.log(event)
  }
  return (
    <ChipList {...args} options={options} showInput className={'w-[500px]'} onChange={handleChange}  />
  )
}
TemplateList.storyName = 'Chips List';
TemplateList.args = {};
