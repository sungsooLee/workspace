import SpaceService from '../api/space';
import { getQuerySkipToken } from '@learnway/shared';

export const queryKeys = {
  all: ['spaces'] as const,
  list: ['space-page'] as const,
  detail: (uuid: string) => [...queryKeys.all, uuid] as const,
};

export const queryOptions = {
  list: (params: any) => ({
    queryKey: queryKeys.list,
    queryFn: () => SpaceService.fetchList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (uuid?: string) =>
    uuid
      ? {
          queryKey: queryKeys.detail(uuid),
          queryFn: (): Promise<any> => SpaceService.fetch(uuid),
        }
      : getQuerySkipToken<any>(),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => SpaceService.create(payload),
  }),
  checkExists: () => ({
    mutationFn: (code: string) => SpaceService.existsCode(code),
  }),
};
