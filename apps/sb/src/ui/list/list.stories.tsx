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
  return <List {...args} options={dummyOptions} onOptionSelect={(option) => console.log(option)} />;
};
Template.storyName = 'List';

// Multiple List
export const TemplateMultiple: any = (args: any) => {
  return (
    <List
      {...args}
      options={dummyOptions}
      onOptionsSelect={(options) => console.log(options)}
      multiple
    />
  );
};
TemplateMultiple.storyName = 'Multiple List';

// Value Control
export const TemplateValueControl: any = (args: any) => {
  const [value, setValue] = useState('value2');
  const [options, setOptions] = useState(dummyOptions);
  const handleOptionDeleteClick = (option: any) => {
    const newOptions = addOrRemoveItemByKey(options, option, 'value');
    setOptions(newOptions);
  };
  return (
    <div>
      <Button
        label={'set value4'}
        variant={'point'}
        size={'sm'}
        onClick={() => setValue('value4')}
      />
      <Button label={'reset'} variant={'point'} size={'sm'} onClick={() => setValue('')} />
      <List
        {...args}
        selectable={false}
        deletable={true}
        options={options}
        value={value}
        onOptionSelect={(option) => console.log('onOptionSelect', option)}
        onOptionDeleteClick={handleOptionDeleteClick}
      />
    </div>
  );
};
TemplateValueControl.storyName = 'Value Control';
