// src/components/VideoPlayerContainer.stories.tsx

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import VideoPlayerContainer from './VideoPlayerContainer';
import { VideoState } from '../model/model';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const meta: Meta<typeof VideoPlayerContainer> = {
  title: 'Component/VideoPlayerContainer',
  component: VideoPlayerContainer,
  decorators: [
    (Story) => (
      <QueryClientProvider client={new QueryClient()}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  argTypes: {
    initialState: { control: 'object' },
    refetchFunc: { action: 'refetchFunc called' },
  },
};

export default meta;

type Story = StoryObj<typeof VideoPlayerContainer>;

export const Default: Story = {
  args: {
    initialState: {
      playing: false,
      volume: 0.8,
      progress: 0,
      duration: 0,
      fullscreen: false,
      showSubtitles: false,
      played: 0,
      muted: false,
      loaded: 0,
      seeking: false,
      allowSeek: true,
      subtitles: [],
      subtitle: '',
      playbackRate: 1.0,
      watchTime: 0,
      lastPlayedTime: 0,
      currentTime: 0,
      url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
      userId: 1,
      contentId: 1,
      chapterId: 1,
      kitId: 1,
      courseId: 1,
      sequenceId: 1,
    } as VideoState,
    refetchFunc: () => {
      console.log('Refetch function called');
    },
  },
};
