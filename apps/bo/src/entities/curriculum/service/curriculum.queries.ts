import {
  CurriculumCreateRequest,
  CurriculumDndParams,
  CurriculumSearchParams,
  CurriculumUpdateRequest,
  FixedModuleSaveParams,
  FixedModuleUpdateParams,
  GeneralLessonSaveParams,
  GeneralModuleSaveParams,
  GeneralModuleUpdateParams,
  LessonUpdateParams } from '../model/curriculum.types';
import { CurriculumService } from '../api/curriculum';

export const queryKeys = {
  all: ['curriculum-all'] as const,
  detail: (curriculumId: number) => [...queryKeys.all, curriculumId] as const,
  moduleDetail: (moduleId: number) => [...queryKeys.all, 'module', moduleId] as const,
  lessonDetail: (data: { lessonId?: number; moduleId?: number }) =>
    [...queryKeys.all, 'lesson', data.lessonId, data.moduleId] as const };

export const queryOptions = {
  list: (param: CurriculumSearchParams) => ({
    queryKey: queryKeys.all,
    queryFn: () => {
      // 빈 값 필터링
      const filteredParams = Object.keys(param).reduce(
        (acc, key) => {
          const value = param[key as keyof CurriculumSearchParams];
          if (value !== null && value !== undefined && value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, unknown>,
      );

      return CurriculumService.getCurriculumList(filteredParams as CurriculumSearchParams);
    } }),
  detail: (curriculumId: number) => ({
    queryKey: queryKeys.detail(curriculumId),
    queryFn: () => CurriculumService.getCurriculumDetail(curriculumId),
    enabled: !!curriculumId }),
  moduleDetail: (moduleId: number) => ({
    queryKey: queryKeys.moduleDetail(moduleId),
    queryFn: () => CurriculumService.getModuleDetail(moduleId),
    enabled: !!moduleId }),
  lessonDetail: (data: { lessonId?: number; moduleId?: number }) => ({
    queryKey: queryKeys.lessonDetail(data),
    queryFn: () =>
      CurriculumService.getLessonDetail(data as { moduleId: number; lessonId: number }),
    enabled: !!data.moduleId && !!data.lessonId }) };

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: CurriculumCreateRequest) => CurriculumService.createCurriculum(payload) }),
  updateCurriculum: () => ({
    mutationFn: (payload: CurriculumUpdateRequest) => CurriculumService.updateCurriculum(payload) }),
  deleteCurriculum: () => ({
    mutationFn: (payload: { curriculumId: number }) => CurriculumService.deleteCurriculum(payload) }),
  copyCurriculum: () => ({
    mutationFn: (payload: { curriculumId: number }) => CurriculumService.copyCurriculum(payload) }),
  createGeneralModule: () => ({
    mutationFn: (payload: GeneralModuleSaveParams) =>
      CurriculumService.createCurriculumModule(payload) }),
  updateGeneralModule: () => ({
    mutationFn: (payload: GeneralModuleUpdateParams) =>
      CurriculumService.updateCurriculumModule(payload) }),
  createFixedModule: () => ({
    mutationFn: (payload: FixedModuleSaveParams) =>
      CurriculumService.createCurriculumFixedModule(payload) }),
  updateFixedModule: () => ({
    mutationFn: (payload: FixedModuleUpdateParams) =>
      CurriculumService.updateCurriculumFixedModule(payload) }),
  createLessonByModule: () => ({
    mutationFn: (payload: GeneralLessonSaveParams) =>
      CurriculumService.createGeneralLesson(payload) }),
  createLessonByCurriculum: () => ({
    mutationFn: (payload: GeneralLessonSaveParams) =>
      CurriculumService.createCurriculumLesson(payload) }),
  updateLessonByGeneral: () => ({
    mutationFn: (payload: LessonUpdateParams) => CurriculumService.updateGeneralLesson(payload) }),
  updateLessonByFixed: () => ({
    mutationFn: (payload: LessonUpdateParams) => CurriculumService.updateFixedLesson(payload) }),
  dndCurriculumTree: () => ({
    mutationFn: (data: CurriculumDndParams) => CurriculumService.updateDndCurriculumTree(data) }),
  deleteCurriculumModule: () => ({
    mutationFn: (data: { curriculumId: number; moduleId: number }) =>
      CurriculumService.deleteCurriculumModule(data) }),
  deleteCurriculumLesson: () => ({
    mutationFn: (data: { moduleId: number; lessonId: number }) =>
      CurriculumService.deleteCurriculumLesson(data) }) };
