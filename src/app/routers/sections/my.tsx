import { KitPage } from '@/pages/sample/KitPage';
import { FetchBoundary } from '@/shared/components/error/FetchErrorBoundary';
import { lazy } from 'react';

const ChannelDetail = lazy(() => import('@/pages/sample/ChannelDetail'));
// const VideoDetail = lazy(() => import('@/pages/sample/VideoDetail'));

export const myRoutes = [
  {
    path: 'my',
    children: [
      {
        path: 'subscribe',
        element: (
          <>
            <KitPage />
          </>
        ),
      },
      {
        path: 'input-sample',
        element: <>{/* <InputSample2 /> */}</>,
      },
      {
        path: 'channel-detail',
        element: (
          <FetchBoundary>
            <ChannelDetail />
          </FetchBoundary>
        ),
      },
      // {
      //   path: 'video/:id',
      //   element: (
      //     <>
      //       <FetchBoundary>
      //         <VideoDetail />
      //       </FetchBoundary>
      //     </>
      //   ),
      // },
    ],
  },
];
