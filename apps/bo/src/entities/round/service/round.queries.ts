import RoundService from '../api/round';

export const queryKeys = {
  list: ['round-list'] as const,
  detail: ['round-detail'] as const,
};

export const queryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.list,
    queryFn: () => RoundService.fetchList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  detail: (params: number) => ({
    queryKey: queryKeys.detail,
    queryFn: () => RoundService.fetchOne(params),
  }),
};

export const mutateOptions = {};
