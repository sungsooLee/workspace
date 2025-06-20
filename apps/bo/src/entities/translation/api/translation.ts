import { httpService, objectToQueryString } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import { Tenant } from '../../../types';

export default class TranslationService {
  static fetchTranslations(params: any) {
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

  static deployTranslation(payload: any) {
    const { locale } = payload;
    return httpService.post<any>(
      `${PMSApiPrefix()}/multilingual/${locale}/multilingualJson`,
      payload,
    );
  }

  // 다국어 번역상태 팝업 조회
  static fetchTranslationStatus(multilingualId: number) {
    return httpService.get<any>(
      `${PMSApiPrefix()}/multilingual/${multilingualId}/language-statuses`,
    );
  }

  static createTranslationByExcel(payload: any) {
    return httpService.post<any>(`${PMSApiPrefix()}/multilingual/excelUpload`, payload);
  }

  static fetchTranslationExists(param: any) {
    return httpService.get<any>(`${PMSApiPrefix()}/multilingual/exists`, param);
  }
}
