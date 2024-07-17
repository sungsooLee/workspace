import Home from '@/pages/sample/home';

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
