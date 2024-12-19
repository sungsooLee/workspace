import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getDefaultLang, setI18nResource } from '@learnway/config';

import { queryKeys, queryOptions, mutateOptions } from './i18n-resource.queries';

export function useFetchI18nResource(languageCode?: string) {
  return useQuery(queryOptions.detail(languageCode ?? getDefaultLang()));
}

export function useFetchAsyncI18nResource(mutationOptions = {}) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    ...mutateOptions.fetchAsync(),
    onSuccess: async (data: any, variables, context) => {
      // 공통 메세지 처리 등...
    },
    ...mutationOptions,
  });

  return {
    fetch: async (languageCode: string): Promise<any> => {
      let resource = queryClient.getQueryData(queryKeys.detail(languageCode));
      console.log('fetch resource', languageCode, queryKeys.detail(languageCode), resource);
      if (resource) {
        return new Promise((resolve) => resolve(resource));
      }
      resource = await mutateAsync(languageCode);

      queryClient.setQueryData(queryKeys.detail(languageCode), resource);
      setI18nResource(languageCode, resource);

      return resource;
    },
  };
}
