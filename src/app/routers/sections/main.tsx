import Home from '@/pages/Home';

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
