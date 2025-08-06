import ProgramManagerService from '../api/program-manager';
import { Program } from '../model/program.types';

export const queryKeys = {
  all: ['program-manager-all'] as const,
};

export const programManageQueryOptions = {
  all: (apiScopeCode = 'FO') => ({
    queryKey: [...queryKeys.all, apiScopeCode],
    queryFn: async () => ProgramManagerService.fetchPrograms(apiScopeCode),
  }),
  getProgram: (apiUuid: string) => ({
    queryKey: [...queryKeys.all, apiUuid],
    queryFn: async () => ProgramManagerService.fetchProgram(apiUuid),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: Program) => ProgramManagerService.createProgram(payload),
  }),
  delete: () => ({
    mutationFn: (apiId: string) => ProgramManagerService.deleteProgram(apiId),
  }),
  update: () => ({
    mutationFn: (payload: Program) => ProgramManagerService.updateProgram(payload),
  }),
  dnd: () => ({
    mutationFn: (payload: any) => ProgramManagerService.dndProgram(payload),
  }),
};
