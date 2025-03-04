import { QueryClient } from '@tanstack/react-query';
import { merge } from 'lodash';

export const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
export const fiveMinutes = 1000 * 60 * 5;
export const oneMinutes = 1000 * 60;

class ReactQueryClient {
  private queryClient!: any;
  private based: any = {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 0, //twentyFourHoursInMs,
      cacheTime: 0, //fiveMinutes,
    },
  };

  init(options: any) {
    console.log('ReactQueryConfig init');
    this.queryClient = new QueryClient({
      defaultOptions: merge(this.based, options),
    });
  }

  getQueryClient() {
    return this.queryClient;
  }

  cacheOptions() {
    return {
      staleTime: twentyFourHoursInMs,
      cacheTime: fiveMinutes,
    };
  }
}

export const QueryConfig = new ReactQueryClient();
