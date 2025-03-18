// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { ThumbnailImageUpload } from '@learnway/ui';
import { ImageOption } from '@/libs/ui/src/lib/thumbnail/type';

export default {
  title: 'Components/FileUpload',
  component: ThumbnailImageUpload,
  tags: ['autodocs'],
  args: {},
  argTypes: {
    onCheckedChange: { action: 'onCheckedChange' },
    onImageSelect: { action: 'onImageSelect' },
  },
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
        // onChange={(options: ImageOption[]) => console.log('onChange', options)}
        onCheckedChange={(options: ImageOption[]) => console.log('onCheckedChange', options)}
        onImageSelect={(newOption) => setOptions([newOption, ...options])}
      />
    </div>
  );
};
TemplateThumbnailImage.storyName = 'Thumbnail Image Upload ';
