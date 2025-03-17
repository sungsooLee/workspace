// BaseForm.stories.tsx
import React from 'react';
import type { Meta } from '@storybook/react';
import { Thumbnail, ThumbnailList } from '@learnway/ui';
import { ImageOption } from '@/libs/ui/src/lib/thumbnail/type';

export default {
  title: 'Components/Thumbnail',
  component: Thumbnail,
  tags: ['autodocs'],
  args: {},
} as Meta;

// Thumbnail
export const Template: any = (args: any) => {
  return <Thumbnail {...args} path={'https://github.com/shadcn.png'} />;
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
          { id: '1', path: 'https://lodash.com/assets/img/lodash.svg' },
          { id: '2', path: 'https://lodash.com/assets/img/lodash.svg' },
          { id: '3', path: 'https://lodash.com/assets/img/lodash.svg' },
          { id: '4', path: 'https://lodash.com/assets/img/lodash.svg' },
        ]}
      />
    </div>
  );
};
TemplateList.storyName = 'Thumbnail List';

// Thumbnail List
export const TemplateCheckList: any = (args: any) => {
  return (
    <div className={'h-[110px] w-[500px]'}>
      <ThumbnailList
        {...args}
        options={[
          { id: '1', path: 'https://lodash.com/assets/img/lodash.svg' },
          { id: '2', path: 'https://lodash.com/assets/img/lodash.svg' },
          { id: '3', path: 'https://lodash.com/assets/img/lodash.svg' },
          { id: '4', path: 'https://lodash.com/assets/img/lodash.svg' },
        ]}
        showCheckbox
        onChecked={(selectedImages: ImageOption[]) => console.log(selectedImages)}
      />
    </div>
  );
};
TemplateCheckList.storyName = 'Thumbnail List (Checkbox)';
