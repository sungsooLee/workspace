// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button, List, Thumbnail } from '@learnway/ui';
import { addOrRemoveItemByKey, getRandomId } from '@learnway/shared';

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
      <Button label={'선택 초기화'} variant={'point'} size={'sm'} onClick={() => setValue('')} />
      <List
        {...args}
        options={dummyOptions}
        value={value}
        onOptionSelect={(option) => setValue(option.value)}
      />
    </div>
  );
};
Template.storyName = 'List (Single)';

// Multiple Selection
export const TemplateMultiple: any = (args: any) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div>
      <Button label={'선택 초기화'} variant={'point'} size={'sm'} onClick={() => setValue([])} />
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
TemplateMultiple.storyName = 'List (Multiple)';

// Delete Option
export const TemplateOptionDelete: any = (args: any) => {
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
TemplateOptionDelete.storyName = 'Delete Option';

// Image
export const TemplateImage: any = (args: any) => {
  const [value, setValue] = useState<any>();
  console.log(value);
  return (
    <List
      deletable
      draggable
      options={imageOptions}
      value={value}
      valueField={'id'}
      itemRenderer={(option: any) => (
        <div className={'m-2 flex flex-row items-center gap-3'}>
          <Thumbnail width={84} height={55} path={option.path} indexNumber={1} />
          <span>{option.name}</span>
        </div>
      )}
      onOptionSelect={(option) => setValue(option.id)}
    />
  );
};
TemplateImage.storyName = 'Image';

const imageOptions = Array(5)
  .fill(null)
  .map((d, i) => ({
    id: getRandomId(),
    name: `name${i}`,
    size: 1024,
    path: 'https://picsum.photos/200',
  }));
