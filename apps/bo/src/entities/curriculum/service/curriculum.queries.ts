import { CurriculumCreateRequest, CurriculumSearchParams } from '@types';
import { CurriculumService } from '../api/curriculum';

export const queryKeys = {
  all: ['curriculum-all'] as const,
};

export const queryOptions = {
  list: (param: CurriculumSearchParams) => ({
    queryKey: queryKeys.all,
    queryFn: () => CurriculumService.getCurriculumList(param),
  }),
  detail: (curriculumId: number) => ({
    queryKey: [...queryKeys.all, curriculumId],
    queryFn: () => CurriculumService.getCurriculumDetail(curriculumId),
    enabled: !!curriculumId,
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: CurriculumCreateRequest) => CurriculumService.createCurriculum(payload),
  }),
};
