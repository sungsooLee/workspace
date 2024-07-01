import { lazy } from 'react';

const SamplePage = lazy(() => import('@/pages/sample/sample'));

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
        path: 'sample',
        element: (
          <>
            <SamplePage />
          </>
        ),
      },
    ],
  },
];
