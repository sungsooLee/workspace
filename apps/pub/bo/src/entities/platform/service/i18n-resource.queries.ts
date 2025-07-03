import I18nResourceService from '../api/i18n-resource';

import { getQuerySkipToken } from '@learnway/shared';

export const queryKeys = {
  all: ['i18n'] as const,
  detail: (languageCode: string) => [...queryKeys.all, languageCode] as const,
};

export const queryOptions = {
  detail: (languageCode?: string) =>
    languageCode
      ? {
          queryKey: queryKeys.detail(languageCode),
          queryFn: async () => {
            const translation = await I18nResourceService.fetchResource(languageCode);
            return {
              [languageCode]: {
                translation,
              },
            };
          },
        }
      : getQuerySkipToken<any>(),
};

export const mutateOptions = {
  fetchAsync: () => ({
    mutationFn: async (payload: string) => {
      const translation = await I18nResourceService.fetchResource(payload);
      return {
        [payload]: {
          translation,
        },
      };
    },
  }),
};
