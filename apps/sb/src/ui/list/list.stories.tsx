// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button, List, ListOption, Thumbnail } from '@learnway/ui';
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
  const [value, setValue] = useState<ListOption>();
  return (
    <div>
      <Button
        label={'select second option'}
        variant={'point'}
        size={'sm'}
        onClick={() => setValue(imageOptions[1])}
      />
      <Button
        label={'선택 초기화'}
        variant={'point'}
        size={'sm'}
        onClick={() => setValue(undefined)}
      />
      <List
        deletable
        options={imageOptions}
        value={value}
        onOptionSelect={(option) => setValue(option)}
      />
    </div>
  );
};
TemplateImage.storyName = 'Image';

const imageResponse = Array(5)
  .fill(null)
  .map((d, i) => ({
    id: getRandomId(),
    name: `name${i}`,
    size: 1024,
    path: 'https://lodash.com/assets/img/lodash.svg',
  }));

const imageOptions = imageResponse.map((d, i) => ({
  value: d.id,
  label: d.id,
  child: (props: any) => (
    <div className={'flex flex-row items-center'}>
      <Thumbnail width={20} path={d.path} />
      <span>{d.name}</span>
    </div>
  ),
}));
