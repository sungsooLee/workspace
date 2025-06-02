import TranslationService from '../api/translation';
import { Tenant } from '../../../types';
import TenantService from '../../tenant/api/tenant';
import { skipToken } from '@tanstack/react-query';

export const queryKeys = {
  all: ['translation-all'] as const,
  get: ['translation'] as const,
  getStatus: (multilingualId: number) => ['translation-status', multilingualId],
};

export const translationQueryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => TranslationService.fetchTranslations(params),
    cacheTime: 0,
    staleTime: 0,
  }),
  getStatus: (multilingualId: number) => ({
    queryKey: queryKeys.getStatus(multilingualId),
    queryFn: () => TranslationService.fetchTranslationStatus(multilingualId),
  }),
};

export const mutateOptions = {
  create: () => ({
    mutationFn: (payload: Tenant) => TranslationService.createTranslation(payload),
  }),
  update: () => ({
    mutationFn: (payload: Tenant) => TranslationService.updateTranslation(payload),
  }),
  delete: () => ({
    mutationFn: (tenantId?: number) =>
      tenantId ? TenantService.deleteTenant(tenantId) : skipToken,
  }),
};
