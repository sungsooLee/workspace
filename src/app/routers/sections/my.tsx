import { lazy, Suspense } from 'react';

const ChannelDetail = lazy(() => import('@/pages/sample/ChannelDetail'));
const VideoDetail = lazy(() => import('@/pages/sample/VideoDetail'));

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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ChannelDetail />
          </Suspense>
        ),
      },
      {
        path: 'video/:id',
        element: (
          <>
            <Suspense fallback={<>Loading.....</>}>
              <VideoDetail />
            </Suspense>
          </>
        ),
      },
    ],
  },
];
