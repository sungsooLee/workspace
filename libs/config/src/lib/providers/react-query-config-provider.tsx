import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { merge } from 'lodash';

export const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
export const fiveMinutes = 1000 * 60 * 5;
export const oneMinutes = 1000 * 60;

/* eslint-disable-next-line */
export interface ReactQueryConfigProviderProps {
  options?: any;
  children?: any;
}

export default function ReactQueryConfigProvider({
  options = {},
  children,
}: ReactQueryConfigProviderProps) {
  // set react-query configuration
  const baseOptions = {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
      cacheTime: fiveMinutes,
    },
  };
  const queryClient = new QueryClient({
    defaultOptions: merge(baseOptions, options),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

//export const ReactQueryConfigProvider = memo(ReactQueryConfigProvider);
