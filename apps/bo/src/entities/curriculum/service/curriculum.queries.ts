import {
  CurriculumCreateRequest,
  CurriculumSearchParams,
  CurriculumUpdateRequest,
  FixedModuleSaveParams,
  FixedModuleUpdateParams,
  GeneralLessonSaveParams,
  GeneralModuleSaveParams,
  GeneralModuleUpdateParams,
  LessonUpdateParams,
} from '@types';
import { CurriculumService } from '../api/curriculum';
import { Mutation } from '@tanstack/react-query';

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
  moduleDetail: (moduleId: number) => ({
    queryKey: [...queryKeys.all, 'module', moduleId],
    queryFn: () => CurriculumService.getModuleDetail(moduleId),
    enabled: !!moduleId,
  }),
  lessonDetail: (data: { lessonId: number; moduleId: number }) => ({
    queryKey: [...queryKeys.all, 'lesson', data.lessonId],
    queryFn: () => CurriculumService.getLessonDetail(data),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: CurriculumCreateRequest) => CurriculumService.createCurriculum(payload),
  }),
  updateCurriculum: () => ({
    mutationFn: (payload: CurriculumUpdateRequest) => CurriculumService.updateCurriculum(payload),
  }),
  createGeneralModule: () => ({
    mutationFn: (payload: GeneralModuleSaveParams) =>
      CurriculumService.createCurriculumModule(payload),
  }),
  updateGeneralModule: () => ({
    mutationFn: (payload: GeneralModuleUpdateParams) =>
      CurriculumService.updateCurriculumModule(payload),
  }),
  createFixedModule: () => ({
    mutationFn: (payload: FixedModuleSaveParams) =>
      CurriculumService.createCurriculumFixedModule(payload),
  }),
  updateFixedModule: () => ({
    mutationFn: (payload: FixedModuleUpdateParams) =>
      CurriculumService.updateCurriculumFixedModule(payload),
  }),
  createLessonByModule: () => ({
    mutationFn: (payload: GeneralLessonSaveParams) =>
      CurriculumService.createGeneralLesson(payload),
  }),
  createLessonByCurriculum: () => ({
    mutationFn: (payload: GeneralLessonSaveParams) =>
      CurriculumService.createCurriculumLesson(payload),
  }),
  updateLessonByGeneral: () => ({
    mutationFn: (payload: LessonUpdateParams) => CurriculumService.updateGeneralLesson(payload),
  }),
  updateLessonByFixed: () => ({
    mutationFn: (payload: LessonUpdateParams) => CurriculumService.updateFixedLesson(payload),
  }),
};
