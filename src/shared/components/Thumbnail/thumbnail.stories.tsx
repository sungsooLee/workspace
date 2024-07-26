import Thumbnail, { ThumbnailProps } from './thumbnail';
import { Meta, StoryFn } from '@storybook/react';
const meta: Meta<typeof Thumbnail> = {
  title: 'Component/Thumbnail',
  component: Thumbnail,
  argTypes: {
    size: {
      options: [240, 280, 380],
      control: { type: 'select' },
    },
    type: {
      options: ['default', 'package', 'check'],
      control: { type: 'radio' },
    },
    info: {
      control: 'object',
    },
    onClick: { action: 'clicked' },
  },
};
export default meta;

const Template: StoryFn<ThumbnailProps> = (args) => <Thumbnail {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 240,
  type: 'default',
  info: {
    id: 1,
    course: {
      thumbnailUrl:
        'https://cdn.inflearn.com/public/course-326063-cover/4aff7ad8-ebd6-49ea-8d19-64d7e746c4fe',
      title: 'Sample Course Title',
    },
  },
  onClick: (videoId: number) => alert('클릭 비디오 ID=' + videoId),
};

// export const Package = Template.bind({});
// Package.args = {
//   ...Default.args,
//   type: 'package',
// };
