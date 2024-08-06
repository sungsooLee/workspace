import Home from '@/pages/sample/Home';

export const mainRoutes = [
  {
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
];
