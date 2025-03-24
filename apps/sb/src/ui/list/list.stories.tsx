// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button, List } from '@learnway/ui';
import { addOrRemoveItemByKey } from '@learnway/shared';

const dummyOptions = Array(5)
  .fill(null)
  .map((d, i) => ({ value: `value${i}`, label: `label${i}` }));

export default {
  title: 'Components/List',
  component: List,
  tags: ['autodocs'],
  args: {
    onOptionSelect: () => null,
    onOptionsSelect: () => null,
  },
  // args: {
  // variant: 'primary',
  // },
} as Meta;

// List
export const Template: any = (args: any) => {
  const [value, setValue] = useState<string>('value0');
  return (
    <div>
      <Button
        label={'set value0'}
        variant={'point'}
        size={'sm'}
        onClick={() => setValue('value0')}
      />
      <Button label={'reset'} variant={'point'} size={'sm'} onClick={() => setValue('')} />
      <List
        {...args}
        options={dummyOptions}
        value={value}
        onOptionSelect={(option) => setValue(option.value)}
      />
    </div>
  );
};
Template.storyName = 'List';

// Multiple Selection
export const TemplateMultiple: any = (args: any) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div>
      <Button label={'reset'} variant={'point'} size={'sm'} onClick={() => setValue([])} />
      <List
        {...args}
        multiple
        options={dummyOptions}
        value={value}
        onOptionsSelect={(options) => setValue(options.map((d) => d.value))}
      />
    </div>
  );
};
TemplateMultiple.storyName = 'Multiple Selection';

// Delete Option
export const TemplateDelete: any = (args: any) => {
  const [options, setOptions] = useState(dummyOptions);
  const handleOptionDeleteClick = (option: any) => {
    const newOptions = addOrRemoveItemByKey(options, option, 'value');
    setOptions(newOptions);
  };
  return (
    <List
      {...args}
      disabledActive
      deletable
      options={options}
      onOptionSelect={(option) => console.log('onOptionSelect', option)}
      onOptionDeleteClick={handleOptionDeleteClick}
    />
  );
};
TemplateDelete.storyName = 'Delete Option';
