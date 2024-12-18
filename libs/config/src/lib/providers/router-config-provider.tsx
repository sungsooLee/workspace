import { RouterProvider, createRouter } from '@tanstack/react-router';
import { merge } from 'lodash';

/* eslint-disable-next-line */
export interface RouterConfigConfigProviderProps {
  routeTree: any;
}

export function RouterConfigConfigProvider({ routeTree }: RouterConfigConfigProviderProps) {
  return <></>; //<RouterProvider router={router} />;
}

//export const ReactQueryConfigProvider = memo(ReactQueryConfigProvider);
