import { httpService, objectToQueryString } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Tenant } from '../../../types';

export default class TranslationService {
  static fetchTranslations(params: any) {
    console.log('params => ', params);
    return httpService.get<any>(`${PMSApiPrefix()}/multilingual`, params);
  }
  static fetchTranslation(messageId: string) {
    return httpService.get<any>(`/pms-module/admin/api/v1/i18n/${messageId}`);
  }
  static updateTranslation(payload: any) {
    return httpService.put<Tenant>(`${PMSApiPrefix()}/multilingual`, payload);
  }
  static createTranslation(payload: any) {
    return httpService.post<Tenant>(`/pms-module/admin/api/v1/i18n`, payload);
  }

  static deleteTranslation(id: number) {
    return httpService.delete<Tenant>(`/pms-module/admin/api/v1/i18n`, { id });
  }
}
