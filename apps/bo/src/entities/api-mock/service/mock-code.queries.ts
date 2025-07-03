import MockCodeService from '../api/mock-code';

export const queryKeys = {
  all: ['mock-code'] as const,
  code: ['mock-code'] as const,
  testCodes: ['mock-test-codes'] as const,
  testCode: ['mock-test-code'] as const,
};

export const queryOptions = {
  getTestCode: (code: string) => ({
    queryKey: queryKeys.testCode,
    queryFn: () => MockCodeService.getTestCode(code),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
  getTestCodes: () => ({
    queryKey: queryKeys.testCodes,
    queryFn: () => MockCodeService.getTestCodes(),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
};
