import { useState } from 'react';
import { useCreation } from 'ahooks';

import { SelectOption } from '@learnway/ui';
import { CODE_GROUP, Code } from '@learnway/config';
import { getDefaultLang, setDefaultLang } from '@learnway/config';

import { useCodesByCodeGroup, useFetchAsyncI18nResource } from '../../../entities/platform';
import { useUpdateUser } from '../../../entities/auth';

const AVALIABLE_LANGUAGES = ['en', 'ko'];

export function useLanguageSelectOptions() {
  const { data } = useCodesByCodeGroup(CODE_GROUP.LANGUAGE_CODE);

  return {
    data: useCreation(() => {
      return data
        .filter((code: Code) => AVALIABLE_LANGUAGES.includes(code.code))
        .map(
          (code: Code) =>
            ({
              label: code.name,
              value: code.code,
              extra: code,
            }) as SelectOption,
        );
    }, [data]),
  };
}

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
