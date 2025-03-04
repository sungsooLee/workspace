import TranslationService from '../api/translation';

export const queryKeys = {
  all: ['translation-all'] as const,
};

export const translationQueryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => TranslationService.fetchTranslations(),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
};
