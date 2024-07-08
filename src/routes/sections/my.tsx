import { lazy } from 'react';

const ChannelDetail = lazy(() => import('@/pages/sample/channel-detail'));
const VideoDetail = lazy(() => import('@/pages/sample/video-detail'));

export const myRoutes = [
  {
    path: 'my',
    children: [
      {
        path: 'subscribe',
        element: <>구독</>,
      },
      {
        path: 'learnig-state',
        element: <>나의 학습 현황</>,
      },
      {
        path: 'channel-detail',
        element: <ChannelDetail />,
      },
      {
        path: 'video/:id',
        element: (
          <>
            <VideoDetail />
          </>
        ),
      },
    ],
  },
];
