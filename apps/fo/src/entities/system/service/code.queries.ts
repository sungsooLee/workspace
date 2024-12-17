import CodeService from '../api/code';

export const queryKeys = {
  all: ['codes'] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => CodeService.fetchCodes('en'),
  }),
};
