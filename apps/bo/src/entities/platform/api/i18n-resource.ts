import { httpService } from '@learnway/shared';
import { PMSApiPrefix } from '@learnway/config';

import i18nResourceEnMock from '../../mock/i18n-resource-en.json';
import i18nResourceKoMock from '../../mock/i18n-resource-ko.json';

export default class I18nResourceService {
  static fetchResource(languageCode: string) {
    //return httpService.get<Company[]>(`${PMSApiPrefix()}/codes?languageCode=${languageCode}`);
    console.log('I18nResourceService.fetchResource', languageCode);
    return new Promise((resolve) =>
      setTimeout(
        () => resolve((languageCode === 'ko' ? i18nResourceKoMock : i18nResourceEnMock) as any),
        3000,
      ),
    );
  }
}
