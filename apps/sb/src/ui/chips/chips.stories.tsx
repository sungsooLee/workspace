// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Chip, ChipList } from '@learnway/ui';

export default {
  title: 'Components/Chips',
  component: Chip,
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
    <Chip {...args} option={{ label: '현대자동차', value: 'H' }}>
      Chips
    </Chip>
  );
};
Template.storyName = 'Chips';

// Handle Delete
export const TemplateList: any = (args: any) => {
  const options: any[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
  ];
  const handleChipClick = (event: any) => {
    console.log('handleChipClick', event);
  };
  const handleChange = (event: any[]) => {
    console.log('handleChange', event);
  };
  return (
    <ChipList
      options={options}
      visibleCount={3}
      onChipClick={handleChipClick}
      onChange={handleChange}
    />
  );
};
TemplateList.storyName = 'Chips List (한줄)';

// Handle Delete
export const TemplateListWordwrap: any = (args: any) => {
  const options: any[] = [
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
    { label: '현대자동차 F', value: 'F' },
  ];
  const handleChipClick = (event: any) => {
    console.log('handleChipClick', event);
  };
  const handleChange = (event: any[]) => {
    console.log('handleChange', event);
  };
  return (
    <ChipList
      options={options}
      showInput
      wordwrap
      onChipClick={handleChipClick}
      onChange={handleChange}
    />
  );
};
TemplateListWordwrap.storyName = 'Chips List (여러줄)';
