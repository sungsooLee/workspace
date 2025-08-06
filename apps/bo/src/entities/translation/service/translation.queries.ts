import { skipToken } from '@tanstack/react-query';
import { tenantApi } from '../../tenant/api/tenant';
import TranslationService from '../api/translation';
import {
  MultilingualExcel,
  MultilingualQueryParams,
  MultilingualUpdateReqParams,
} from '../model/multilingual.types';

export const queryKeys = {
  all: ['translation-all'] as const,
  get: ['translation'] as const,
  getStatus: (multilingualId: number) => ['translation-status', multilingualId],
  deploy: (locale: string) => ['translation-locale', locale],
  checkExists: (keyTypeCode: string, messageCode: string) => [
    'translation-exists',
    keyTypeCode,
    messageCode,
  ],
};

export const translationQueryOptions = {
  all: (params: MultilingualQueryParams) => ({
    queryKey: queryKeys.all,
    queryFn: () => TranslationService.fetchTranslations(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  getStatus: (multilingualId: number) => ({
    queryKey: queryKeys.getStatus(multilingualId),
    queryFn: () => TranslationService.fetchTranslationStatus(multilingualId),
  }),
  checkExists: (keyTypeCode: string, messageCode: string) => ({
    queryKey: queryKeys.checkExists(keyTypeCode, messageCode),
    queryFn: () => TranslationService.fetchTranslationExists({ keyTypeCode, messageCode }),
  }),
};

export const mutateOptions = {
  update: () => ({
    mutationFn: (payload: MultilingualUpdateReqParams) =>
      TranslationService.updateTranslation(payload),
  }),
  delete: () => ({
    mutationFn: (tenantId?: number) => (tenantId ? tenantApi.deleteTenant(tenantId) : skipToken),
  }),
  deploy: () => ({
    mutationFn: (payload: { locale: string }) => TranslationService.deployTranslation(payload),
  }),
  createByExcel: () => ({
    mutationFn: ({
      data,
      params,
    }: {
      data: MultilingualExcel[];
      params: { targetLocale: string };
    }) => TranslationService.createTranslationByExcel(data, params),
  }),
};
