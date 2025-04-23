// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { ImageOption, Thumbnail, ThumbnailList } from '@learnway/ui';
import { addOrRemoveItemByKey } from '@learnway/shared';

export default {
  title: 'Components/Thumbnail',
  component: Thumbnail,
  tags: ['autodocs'],
  args: {},
} as Meta;

// Thumbnail
export const Template: any = (args: any) => {
  return (
    <Thumbnail {...args} path={'https://picsum.photos/200'} indexNumber={1} sizeText={'100MB'} />
  );
};
Template.storyName = 'Thumbnail';
Template.args = {};

// Thumbnail List
export const TemplateList: any = (args: any) => {
  return (
    <div className={'h-[110px] w-[500px]'}>
      <ThumbnailList
        {...args}
        options={[
          { id: '1', path: 'https://picsum.photos/200' },
          { id: '2', path: 'https://picsum.photos/200' },
          { id: '3', path: 'https://picsum.photos/200' },
          { id: '4', path: 'https://picsum.photos/200' },
        ]}
      />
    </div>
  );
};
TemplateList.storyName = 'Thumbnail List';

// Thumbnail List
export const TemplateCheckList: any = (args: any) => {
  const [options, setOptions] = useState<ImageOption[]>([
    { id: '1', path: 'https://picsum.photos/200', checked: true },
    { id: '2', path: 'https://picsum.photos/200', checked: true },
    { id: '3', path: 'https://picsum.photos/200', checked: true },
  ]);

  const [selectedOptions, setSelectedOptions] = useState<ImageOption[]>([]);

  const handleCheckChange = (option: ImageOption) => {
    const newSelectedOptions = addOrRemoveItemByKey(selectedOptions, option, 'id');
    setSelectedOptions(newSelectedOptions);
    console.log(newSelectedOptions);
  };
  return (
    <div className={'h-[110px] w-[500px]'}>
      <ThumbnailList {...args} options={options} showCheckbox onChangeChecked={handleCheckChange} />
    </div>
  );
};
TemplateCheckList.storyName = 'Thumbnail List (Checkbox)';
