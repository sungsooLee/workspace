import MenuMangerService from '../api/menu-manager';

export const queryKeys = {
  all: ['menu-manger-all'] as const,
};

export const menuManagerQueryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: async () => MenuMangerService.fetchMenus(),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
};
