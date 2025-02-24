// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { ChipList, Chips } from '@learnway/ui';

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
    <Chips {...args} option={{ label: '현대자동차', value: 'H' }}>
      Chips
    </Chips>
  );
};
Template.storyName = 'Chips';

// Handle Delete
export const TemplateDelete: any = (args: any) => {
  const handleClick = (event: any) => {
    alert('click event');
    alert(JSON.stringify(event));
  };
  const handleDelete = (event: any) => {
    alert('delete event');
    alert(JSON.stringify(event));
  };
  return (
    <Chips
      {...args}
      option={{ label: '현대자동차', value: 'H' }}
      onClick={handleClick}
      onDelete={handleDelete}
    />
  );
};
TemplateDelete.storyName = 'Handle Delete';

// Handle Delete
export const TemplateList: any = (args: any) => {
  const options: any[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
  ];
  const handleItemClick = (event: any) => {
    console.log('handleItemClick', event);
  };
  const handleChange = (event: any[]) => {
    console.log('handleChange', event);
  };
  return (
    <ChipList
      options={options}
      className={'w-[500px]'}
      showInput
      onItemClick={handleItemClick}
      onChange={handleChange}
    />
  );
};
TemplateList.storyName = 'Chips List';
