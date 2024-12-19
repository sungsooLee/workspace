import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getBrowserLang, cookieService } from '@learnway/shared';

export function initI18N(resources: any) {
  i18next
    //.use(XHR)
    .use(initReactI18next)
    .init({
      debug: false,
      lng: getDefaultLang(),
      fallbackLng: false,
      // 4가지 설정하면 초기에 모든 파일이 다운로드됨
      // i18n 변경시 download 하도록 변경한다.
      // ref: https://www.i18next.com/overview/api - loadLanguages
      // fallbackLng: ['en', 'ko', 'ja', 'cn'],
      react: {
        useSuspense: true,
      },
      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
      resources,
    });
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
  i18next.addResources(lang, 'translation', resource[lang]['translation']);
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
