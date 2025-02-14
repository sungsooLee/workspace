// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { ThumbnailImageUpload } from '@learnway/ui';
import { ImageOption } from '@/libs/ui/src/lib/thumbnail/type';

export default {
  title: 'Components/ImageUpload',
  component: ThumbnailImageUpload,
  tags: ['autodocs'],
  args: {},
} as Meta;

// ImageUpload
export const Template: any = (args: any) => {
  return (
    <div className={'h-[120px] w-[500px]'}>
      <ThumbnailImageUpload
        {...args}
        options={[
          { id: '1', path: 'https://lodash.com/assets/img/lodash.svg' },
          { id: '2', path: 'https://lodash.com/assets/img/lodash.svg' },
          { id: '3', path: 'https://lodash.com/assets/img/lodash.svg' },
          { id: '4', path: 'https://lodash.com/assets/img/lodash.svg' },
        ]}
        description={'교육자원을 연결하면 추천 썸네일이 표시됩니다.'}
        onChange={(options: ImageOption[]) => console.log('onChange', options)}
      />
    </div>
  );
};
Template.storyName = 'Thumbnail Image Upload ';
Template.args = {};
