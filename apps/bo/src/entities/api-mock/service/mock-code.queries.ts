import MockCodeService from '../api/mock-code';

export const queryKeys = {
  all: ['mock-code'] as const,
  code: ['mock-code'] as const,
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all,
    queryFn: () => MockCodeService.fetchCodes(),
  }),
  getCode: (code: string) => ({
    queryKey: queryKeys.code,
    queryFn: () => MockCodeService.fetchCode(code),
    cacheTime: 0,
    enabled: false,
  }),
};
