// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { Button, List, Thumbnail } from '@learnway/ui';
import { addOrRemoveItemByKey, getRandomId } from '@learnway/shared';

const dummyOptions = Array(5)
  .fill(null)
  .map((d, i) => ({ value: `value${i}`, label: `label${i}` }));

export default {
  title: 'Bo-Components/List',
  component: List,
  tags: ['autodocs'],
  args: {
    onOptionSelect: () => null,
    onOptionsSelect: () => null,
  },
  // includeStories: [''],

  // args: {
  // variant: 'primary',
  // },
} as Meta;

// List
export const Template: any = (args: any) => {
  const [value, setValue] = useState<string>('value0');
  return (
    <div className="space-y-5">
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
    <div className="space-y-5">
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
  const [options, setOptions] = useState(imageOptions);
  const [value, setValue] = useState<any>();
  return (
    <List
      options={options}
      value={value}
      valueField={'id'}
      deletable
      draggable
      hideBorder
      showItemBorder
      disabledActive
      itemRenderer={(option: any, index: number) => (
        <div className={'flex flex-row items-center gap-3'}>
          <Thumbnail
            width={84}
            height={55}
            path={option.path}
            indexNumber={index}
            sizeText={'1.4MB'}
          />
          <span>{option.name}</span>
        </div>
      )}
      onOptionDeleteClick={(data) => {
        const filteredOptions = options.filter((option) => option.id !== data.id);
        setOptions(filteredOptions);
      }}
      onOptionsOrderChange={(newOptions: any) => setOptions(newOptions)}
    />
  );
};
TemplateImage.storyName = '커스텀 + 드래그';

const imageOptions = Array(5)
  .fill(null)
  .map((d, i) => ({
    id: getRandomId(),
    name: `name${i}`,
    size: 1024,
    path: 'https://picsum.photos/200',
  }));
