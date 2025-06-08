// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { ImageOption, ThumbnailImageUpload } from '@learnway/ui';

export default {
  title: 'Components/FileUpload',
  component: ThumbnailImageUpload,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    onCheckedChange: { action: 'onCheckedChange' },
    onImageSelect: { action: 'onImageSelect' },
  },
  includeStories: [''],
} as Meta;

// Thumbnail Image Upload
export const TemplateThumbnailImage: any = (args: any) => {
  const [options, setOptions] = React.useState([
    { id: '1', path: 'https://lodash.com/assets/img/lodash.svg' },
    { id: '2', path: 'https://lodash.com/assets/img/lodash.svg' },
  ]);
  return (
    <div className={'h-[120px] w-[500px]'}>
      <ThumbnailImageUpload
        {...args}
        options={options}
        description={'교육자원을 연결하면 추천 썸네일이 표시됩니다.'}
        onCheckedChange={(options: ImageOption[]) => console.log('onCheckedChange', options)}
        onImageSelect={(newOption) => setOptions([newOption, ...options])}
      />
    </div>
  );
};
TemplateThumbnailImage.storyName = 'Thumbnail Image Upload ';
