import { Meta, StoryFn } from '@storybook/react';
import VideoPlayerContainer from './VideoPlayerContainer';
import { VideoPlayerProps } from '../model/model';

export default {
  title: 'Component/VideoPlayerContainer',
  component: VideoPlayerContainer,
  tags: ['autodocs'],
} as Meta;

const Template: StoryFn<VideoPlayerProps> = (args) => (
  <div style={{ width: '500px' }}>
    <VideoPlayerContainer {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  videoUrl:
    // 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    // 'https://home.wistia.com/medias/e4a27b971d',
    // 'https://streamable.com/moo',
    'https://www.youtube.com/watch?v=ZCae_LPuzBU',
  // 'https://vimeo.com/90509568',
  // 'https://www.twitch.tv/videos/106400740',
  // 'https://www.facebook.com/facebook/videos/10153231379946729',
  // 'https://d1lfq3h9g82ibj.cloudfront.net/test.mp4',
  // 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
  lastPlayed: 0.2,
  getAllowSeek: false,
};

const MultiTemplate: StoryFn<{ players: VideoPlayerProps[] }> = ({
  players,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    {players.map((player, index) => (
      <VideoPlayerContainer key={index} {...player} />
    ))}
  </div>
);

export const MultiplePlayers = MultiTemplate.bind({});
MultiplePlayers.args = {
  players: [
    {
      videoUrl: 'https://d1lfq3h9g82ibj.cloudfront.net/test.mp4',
      lastPlayed: 0.5,
      getAllowSeek: true,
    },
    {
      videoUrl:
        'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      lastPlayed: 0,
      getAllowSeek: true,
    },
  ],
};
