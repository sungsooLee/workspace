import { Meta, StoryFn } from '@storybook/react';
import VideoPlayerContainer from './VideoPlayerContainer';
import { VideoPlayerProps } from '../model/model';

export default {
  title: 'Component/VideoPlayerContainer',
  component: VideoPlayerContainer,
} as Meta;

const Template: StoryFn<VideoPlayerProps> = (args) => (
  <VideoPlayerContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  videoUrl:
    'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  lastPlayed: 0.5,
  getAllowSeek: false,
};
