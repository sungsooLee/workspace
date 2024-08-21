import { ErrorSample } from '@/pages/sample/ErrorSample';
import { FetchBoundary } from '@/shared/components/error/FetchErrorBoundary';
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
        path: 'error-sample',
        element: (
          <>
            <ErrorSample />
          </>
        ),
      },
      {
        path: 'channel-detail',
        element: (
          // <Suspense fallback={<div>Loading...</div>}>
          <FetchBoundary>
            <ChannelDetail />
          </FetchBoundary>
          // </Suspense>
        ),
      },
      {
        path: 'video/:id',
        element: (
          <>
            <FetchBoundary>
              <VideoDetail />
            </FetchBoundary>
          </>
        ),
      },
    ],
  },
];
