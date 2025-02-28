import { httpService } from '@learnway/shared';
import { Tenant } from '../../../types';

export default class TranslationService {
  static fetchTranslations() {
    return httpService.get<any>(`/pms-module/admin/api/v1/codes`);
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
