import { httpService } from '@learnway/shared';
import { Tenant } from '../../../types';

export default class TranslationService {
  static fetchTranslations(params: string) {
    // http://internal-hae-dev-hmgnlp-ingress-alb-an2-1797144147.ap-northeast-2.elb.amazonaws.com/pms-module/admin/api/v1/i18n?page=0&size=10&keyType=&code=&locale=&isUsed=true
    //return httpService.get<any>(`/pms-module/admin/api/v1/codes${params ? `?${params}` : ''}`);
    return httpService.get<any>(
      `/pms-module/admin/api/v1/i18n?page=0&size=10&keyType&code&locale&isUsed=true`,
    );
  }
  static fetchTranslation(messageId: string) {
    return httpService.get<any>(`/pms-module/admin/api/v1/i18n/${messageId}`);
  }
  static updateTranslation(payload: any) {
    return httpService.put<Tenant>(`/pms-module/admin/api/v1/i18n/${payload.messageId}`, payload);
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
