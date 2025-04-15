import { QueryClient } from '@tanstack/react-query';
import { merge } from 'lodash';
import { eventService, HTTP_EVENTS } from '@learnway/shared';

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
      onError: (error: any) => {
        // 에러 발생 시 이벤트 발행
        console.log(error);
        const errorData = {
          title: 'Query Error',
          message: error?.message || '데이터를 불러오는 중 오류가 발생했습니다.',
          status: error?.response?.status,
          url: error?.config?.url,
        };
        eventService.emit(HTTP_EVENTS.REACT_QUERY_ERROR, errorData);
      },
    },
    mutations: {
      onError: (error: any) => {
        // 에러 발생 시 이벤트 발행
        const errorData = {
          title: 'Mutation Error',
          message: error?.message || '데이터를 저장하는 중 오류가 발생했습니다.',
          status: error?.response?.status,
          url: error?.config?.url,
        };
        eventService.emit(HTTP_EVENTS.REACT_QUERY_ERROR, errorData);
      },
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

export const queryConfig = new ReactQueryClient();
