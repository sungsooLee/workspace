import SpaceService from '../api/space';

export const queryKeys = {
  list: ['space-page'] as const,
};

export const queryOptions = {
  list: (params: any) => ({
    queryKey: queryKeys.list,
    queryFn: () => SpaceService.fetchList(params),
    cacheTime: 0,
    staleTime: 0,
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: any) => SpaceService.create(payload),
  }),
};
