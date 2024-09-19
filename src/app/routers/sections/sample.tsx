import { ErrorSamplePage } from '@/pages/sample/error/ErrorSamplePage';
import InputSamplePage from '@/pages/sample/input/InputSample';

export const sampleRoutes = [
  {
    path: 'sample',
    children: [
      {
        path: 'error',
        element: <ErrorSamplePage />,
      },
      {
        path: 'input',
        element: (
          <>
            <InputSamplePage />
          </>
        ),
      },
    ],
  },
];
