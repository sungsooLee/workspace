import { httpService } from '@learnway/shared';

export default class TranslationService {
  static fetchTranslations() {
    return httpService.get<any>(`/pms-module/admin/api/v1/i18n`);
  }
}
