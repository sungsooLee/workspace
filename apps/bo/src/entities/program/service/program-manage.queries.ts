import ProgramManagerService from '../api/program-manager';

export const queryKeys = {
  all: ['program-manager-all'] as const,
};

export const programManageQueryOptions = {
  all: (apiScopeCode = 'FO') => ({
    queryKey: [queryKeys.all, apiScopeCode],
    queryFn: async () => ProgramManagerService.fetchPrograms(apiScopeCode),
  }),
  getProgram: (apiId: string) => ({
    queryKey: [...queryKeys.all, apiId],
    queryFn: async () => ProgramManagerService.fetchProgram(apiId),
  }),
};
