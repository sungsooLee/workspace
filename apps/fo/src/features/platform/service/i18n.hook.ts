import { useState } from 'react';

import { getDefaultLang, setDefaultLang } from '@learnway/config';
import { useUpdateUser } from '@learnway/auth/entities';

import { useFetchAsyncI18nResource } from '../../../entities/platform';

export function useSetLanguage() {
  const [inProgress, setInProgress] = useState<boolean>(false);

  const { fetch } = useFetchAsyncI18nResource();
  const { updateLanguage } = useUpdateUser();

  return {
    set: async (languageCode: string): Promise<any> => {
      setInProgress(true);
      if (languageCode === getDefaultLang()) {
        return new Promise((resolve) => {
          setInProgress(false);
          resolve({});
        });
      }
      if (languageCode !== getDefaultLang()) {
        return fetch(languageCode).then(async () => {
          updateLanguage(languageCode);
          await setDefaultLang(languageCode);
          setInProgress(false);
        });
      }
    },
    inProgress,
  };
}
