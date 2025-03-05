import { httpService } from '@learnway/shared';
import { Tenant } from '../../../types';

export default class TranslationService {
  static fetchTranslations() {
    //return httpService.get<any>(`/pms-module/admin/api/v1/codes`);
    return new Promise((resolve) => {
      resolve({
        messageId: 1,
      });
    });
  }
  static fetchTranslation(messageId: string) {
    //return httpService.get<any>(`/pms-module/admin/api/v1/codes`);
    return new Promise((resolve) => {
      resolve({
        messageId: messageId,
        code: 'TEST_CODE',
        keyType: 'COMMON_CODE',
        messageDesc: '테스트 다국어 입니다.',
        isUsed: true,
        parent: '',
        translations: [
          ...localeCodes
            .filter((lc) => lc !== 'kr')
            .map((item) => ({ locale: item, translation: '' })),
          { locale: 'kr', translation: '한국어' },
        ],
      });
    });
  }
  static updateTranslation(payload: any) {
    return httpService.patch<Tenant>(`/pms-module/admin/api/v1/i18n`, payload);
  }
  static createTranslation(payload: any) {
    return httpService.post<Tenant>(`/pms-module/admin/api/v1/i18n`, payload);
  }

  static deleteTranslation(id: number) {
    return httpService.delete<Tenant>(`/pms-module/admin/api/v1/i18n`, { id });
  }
}

const localeCodes = [
  'kr',
  'ar',
  'zh',
  'zh-TW',
  'hr',
  'de',
  'en',
  'en-AU',
  'et',
  'fr',
  'he',
  'hi',
  'id',
  'it',
  'ja',
  'ms',
  'ne',
  'fa',
  'pt',
  'pt-BR',
  'ro',
  'ru',
  'sk',
  'es',
  'es-LA',
  'th',
  'tr',
  'vi',
];
