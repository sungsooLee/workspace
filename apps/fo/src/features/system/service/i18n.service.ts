import { useState } from 'react';

import { getDefaultLang, setDefaultLang } from '@learnway/config';

import { useFetchAsyncI18nResource } from '../../../entities/system';
import { useUpdateUser } from '../../../entities/user';

export function useSetLanguage() {
  const [inProgress, setInProgress] = useState<boolean>(false);

  const { fetch } = useFetchAsyncI18nResource();
  const { updateLanguage } = useUpdateUser();

  return {
    set: async (languageCode: string): Promise<any> => {
      setInProgress(true);
      if (languageCode === getDefaultLang()) {
        setInProgress(false);
        return new Promise((resolve) => resolve({}));
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
