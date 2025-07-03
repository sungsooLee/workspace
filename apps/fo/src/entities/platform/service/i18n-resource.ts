import { getDefaultLang } from '@learnway/config';

import I18nResourceService from '../api/i18n-resource';

export async function fetchI18nResource(languageCode?: string) {
  const lang = languageCode ?? getDefaultLang();
  const translation = await I18nResourceService.fetchResource(lang);

  return {
    [lang]: {
      translation,
    },
  };
}
