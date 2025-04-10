import ProgramManagerService from '../api/program-manager';

export const queryKeys = {
  all: ['program-manager-all'] as const,
};

export const programManageQueryOptions = {
  all: (rootTreeId = '1', apiScopeCode = 'FO') => ({
    queryKey: queryKeys.all,
    queryFn: async () => ProgramManagerService.fetchPrograms(rootTreeId, apiScopeCode),
  }),
  getProgram: (apiId: string) => ({
    queryKey: [...queryKeys.all, apiId],
    queryFn: async () => ProgramManagerService.fetchProgram(apiId),
  }),
};
