// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button, Chip, ChipList } from '@learnway/ui';

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

// Chips List (한줄)
export const TemplateList: any = (args: any) => {
  const [options, setOptions] = useState([
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
    { label: '현대자동차 C', value: 'C' },
    { label: '현대자동차 D', value: 'E' },
    { label: '현대자동차 F', value: 'F' },
  ]);
  const handleChipClick = (option: any) => {
    console.log('handleChipClick', option);
  };
  const handlerChipDelete = (option: any) => {
    const newOptions = options?.filter((d) => d.value !== option.value);
    setOptions(newOptions);
    console.log('handlerChipDelete', option);
  };
  return (
    <ChipList
      options={options}
      visibleCount={3}
      onChipClick={handleChipClick}
      onChipDeleteClick={handlerChipDelete}
    />
  );
};
TemplateList.storyName = 'Chips List (한줄)';

// Chips List (여러줄)
export const TemplateListWordwrap: any = (args: any) => {
  const [options, setOptions] = useState([
    { label: '현대자동차 A', value: 'A' },
    { label: '현대자동차 B', value: 'B' },
  ]);
  const handleChipClick = (event: any) => {
    console.log('handleChipClick', event);
  };
  const handleAddInputEnterKeyDown = (text: string) => {
    console.log('handleAddInputEnterKeyDown', text);
    setOptions([...options, { label: text, value: text }]);
  };
  const handlerChipDelete = (option: any) => {
    const newOptions = options?.filter((d) => d.value !== option.value);
    setOptions(newOptions);
    console.log('handlerChipDelete', option);
  };
  return (
    <>
      <Button label={'SET'} onClick={() => setOptions([{ label: '현대자동차 C', value: 'C' }])} />
      <ChipList
        options={options}
        showInput
        wordwrap
        onChipClick={handleChipClick}
        onAddInputEnterKeyDown={handleAddInputEnterKeyDown}
        onChipDeleteClick={handlerChipDelete}
      />
    </>
  );
};
TemplateListWordwrap.storyName = 'Chips List (여러줄)';
