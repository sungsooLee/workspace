import {
  ExternalCourseForm,
  ExternalCourseFormLayoutParam,
  ExternalCourseLayoutParam,
} from '@entities/external-education';
import { ExternalEducationService } from '../api/external-education';

export const queryKeys = {
  all: ['external-education-all'] as const,
  detail: (externalCourseFormId: number) => [...queryKeys.all, externalCourseFormId] as const,
  // componentList: (tenantId: number) => [...queryKeys.all, 'components',
  registrationLayout: (data: ExternalCourseLayoutParam) =>
    [
      ...queryKeys.all,
      'registration-layout',
      data.externalCourseFormId,
      data.externalCourseFormEnrollType,
    ] as const,
};

export const queryOptions = {
  list: (param: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => {
      // 빈 값 필터링
      const filteredParams = Object.keys(param).reduce(
        (acc, key) => {
          const value = param[key as keyof typeof param];
          if (value !== null && value !== undefined && value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, unknown>,
      );

      return ExternalEducationService.getExternalEducationList(filteredParams);
    },
  }),
  componentList: ({ tenantId, externalCourseFormEnrollType }: ExternalCourseFormLayoutParam) => ({
    queryKey: [...queryKeys.all, 'components', tenantId],
    queryFn: () =>
      ExternalEducationService.getComponentList({ tenantId, externalCourseFormEnrollType }),
    enabled: !!tenantId && !!externalCourseFormEnrollType,
  }),
  detail: (externalCourseFormId: number) => ({
    queryKey: queryKeys.detail(externalCourseFormId),
    queryFn: () => ExternalEducationService.getExternalEducation(externalCourseFormId),
    enabled: !!externalCourseFormId && externalCourseFormId > 0,
  }),
  registrationLayout: (data: ExternalCourseLayoutParam) => ({
    queryKey: queryKeys.registrationLayout(data),
    queryFn: () => ExternalEducationService.getRegistrationLayout(data),
    enabled:
      !!data.externalCourseFormId &&
      data.externalCourseFormId > 0 &&
      !!data.externalCourseFormEnrollType,
  }),

  getExternalPopup: (externalCourseFormId: number) => ({
    queryKey: [...queryKeys.all, 'popup', externalCourseFormId],
    queryFn: () => ExternalEducationService.getExternalCoursePopup(externalCourseFormId),
    enabled: !!externalCourseFormId && externalCourseFormId > 0,
  }),
};

export const mutateOptions = {
  createExternalCourseForm: () => ({
    mutationFn: (payload: ExternalCourseForm) =>
      ExternalEducationService.createExternalEducation(payload),
  }),
  createExternalCourseLayout: () => ({
    mutationFn: (payload: any) => ExternalEducationService.createExternalCourseLayout(payload),
  }),
  createExternalCoursePopup: () => ({
    mutationFn: (payload: any) => ExternalEducationService.createExternalCoursePopup(payload),
  }),
};
