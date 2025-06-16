import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getBrowserLang, cookieService } from '@learnway/shared';
import dayjs from 'dayjs';

export function initI18N(resources: any) {
  i18next.use(initReactI18next).init({
    debug: false,
    lng: getDefaultLang(),
    fallbackLng: false,
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    resources,
  });
  console.log('getBrowserLang()', getDefaultLang());
  dayjs.locale(getDefaultLang());
}

export function getDefaultLang() {
  return cookieService.get('I18N_LANG') || getBrowserLang() || 'en';
}

export function setDefaultLang(lang: string): Promise<any> {
  if (lang) {
    return i18next.loadLanguages([lang]).then(() => {
      i18next.changeLanguage(lang).then(() => {
        cookieService.set('I18N_LANG', lang);
      });
    });
  }
  return Promise.resolve();
}

export function setI18nResource(lang: string, resource: any) {
  i18next.addResourceBundle(lang, 'translation', resource[lang]['translation'], true, true);
}

/*
export function getI18nResources(localResource: any): any {
  const { en, ko, ja, cn } = commonI18n;
  return {
    en: {
      translation: defaultsDeep(localResource.en, en),
    },
    ko: {
      translation: defaultsDeep(localResource.ko, ko),
    },
    ja: {
      translation: defaultsDeep(localResource.ja, ja),
    },
    cn: {
      translation: defaultsDeep(localResource.cn, cn),
    },
  };
}
*/
