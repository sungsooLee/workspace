import { httpService } from '@learnway/shared';

export default class MockTranslationService {
  static fetchTranslations(params: string) {
    console.log('MockTranslationService.fetchTranslations', params);
    return httpService.get<any>(
      `http://localhost:4000/api/translations${params || params !== '' ? `?${params}` : ''}`,
    );
  }
}
