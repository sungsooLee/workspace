// BaseForm.stories.tsx
import React, { useState } from 'react';
import type { Meta } from '@storybook/react';
import { ImageOption, Thumbnail, ThumbnailList } from '@learnway/ui';

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
  const [options, setOptions] = useState<ImageOption[]>([
    { id: '1', path: 'https://picsum.photos/200' },
    { id: '2', path: 'https://picsum.photos/200' },
    { id: '3', path: 'https://picsum.photos/200' },
  ]);

  const [selectedOptions, setSelectedOptions] = useState<ImageOption[]>([]);

  const handleCheckedChange = (newOptions: ImageOption[]) => {
    const checkedOptions = newOptions.filter((d) => d.checked);
    setSelectedOptions(checkedOptions);
  };

  const handleRemoveOptions = (newOptions: ImageOption[]) => {
    setOptions(newOptions);
  };

  return (
    <div className={'h-[110px] w-[500px]'}>
      <ThumbnailList
        options={options}
        onCheckedChange={handleCheckedChange}
        onRemoveOptions={handleRemoveOptions}
      />
    </div>
  );
};
TemplateList.storyName = 'Thumbnail List';
