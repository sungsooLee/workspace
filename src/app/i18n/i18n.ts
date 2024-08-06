import useLanguageStore from '@/shared/stores/useLanguageStore';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const initI18n = (language : string) => {

  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          "welcome": 'Welcome',
          "channel": 'Channel',
          "logout" : "Logout",
          "DarkMode": "DarkMode"
        },
      },
      ko: {
        translation: {
          "welcome": '환영합니다',
          "channel": '채널',
          "logout":"로그아웃",
          "DarkMode":'다크모드'
        },
      },
    },
    lng: language,
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false,
    },
});
}
export default i18n;
