import MockTranslationService from '../api/mock-translation';

export const queryKeys = {
  all: ['mock-language-all'] as const,
};

export const translationQueryOptions = {
  all: (params: any) => ({
    queryKey: queryKeys.all,
    queryFn: () => MockTranslationService.fetchTranslations(params),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  }),
};
