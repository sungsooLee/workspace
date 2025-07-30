import { useState } from 'react';

import { useUpdateUser } from '@learnway/auth/entities';
import { getDefaultLang, setDefaultLang } from '@learnway/config';

import { useLanguageStore } from '@learnway/hooks';
import { useFetchAsyncI18nResource } from '../../../entities/platform';

export function useSetLanguage() {
  const [inProgress, setInProgress] = useState<boolean>(false);

  const { fetch } = useFetchAsyncI18nResource();
  const { updateLanguage } = useUpdateUser();
  const { setLang } = useLanguageStore();

  return {
    set: async (languageCode: string): Promise<any> => {
      console.log('@@@ languageCode', languageCode);
      setInProgress(true);
      setLang(languageCode);
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
