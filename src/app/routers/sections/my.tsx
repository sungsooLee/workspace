import { KitPage } from '@/pages/sample/KitPage';

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
    ],
  },
];
