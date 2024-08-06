import React from 'react';
import VideoList, { VideoListProps } from './VideoList';
import { Meta, StoryFn } from '@storybook/react';
import * as thumbnailStories from '@/shared/components/Thumbnail/thumbnail.stories';

// import * as ThumbStories from

const meta: Meta<typeof VideoList> = {
  title: 'Component/ThumbnailList',
  component: VideoList,
  argTypes: {
    size: {
      options: [240, 280, 380],
      control: { type: 'select' },
    },
    onClick: { active: 'clicked' },
  },
};
export default meta;
const Template: StoryFn<VideoListProps> = (args) => <VideoList {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 240,
  videos: [
    {
      id: 1,
      progress: 50,
      userId: 'user1',
      course: {
        thumbnailUrl: 'https://via.placeholder.com/240x135',
        title: 'Sample Course Title 1',
        format: 'video',
        type: 'tutorial',
      },
    },
    {
      id: 2,
      progress: 75,
      userId: 'user2',
      course: {
        thumbnailUrl: 'https://via.placeholder.com/240x135',
        title: 'Sample Course Title 2',
        format: 'video',
        type: 'lecture',
      },
    },
    {
      id: 3,
      progress: 30,
      userId: 'user3',
      course: {
        thumbnailUrl: 'https://via.placeholder.com/240x135',
        title: 'Sample Course Title 3',
        format: 'video',
        type: 'workshop',
      },
    },
    {
      id: 4,
      progress: 60,
      userId: 'user4',
      course: {
        thumbnailUrl: 'https://via.placeholder.com/240x135',
        title: 'Sample Course Title 4',
        format: 'video',
        type: 'seminar',
      },
    },
    {
      id: 5,
      progress: 90,
      userId: 'user5',
      course: {
        thumbnailUrl: 'https://via.placeholder.com/240x135',
        title: 'Sample Course Title 5',
        format: 'video',
        type: 'tutorial',
      },
    },
  ],
  onClick: (videoId: number) => alert('클릭 비디오 ID=' + videoId),
};

// export const
