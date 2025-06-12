import { httpService } from '@learnway/shared';
import { isLocal, PMSApiPrefix } from '@learnway/config';

import i18nResourceEnMock from '../../mock/i18n-resource-en.json';
import i18nResourceKoMock from '../../mock/i18n-resource-ko.json';

export default class I18nResourceService {
  static async fetchResource(languageCode: string) {
    console.log();

    const sources = [
      {
        type: 's3',
        url: `${import.meta.env.VITE_AXIOS_S3_URL}/public/${languageCode}.json`,
      },
      {
        type: 'local',
        loader: () => this.getLocalMockData(languageCode),
      },
    ];

    for (const source of sources) {
      try {
        if (source.type === 's3' && !isLocal()) {
          const response = await fetch(source.url as string);
          if (!response.ok) throw new Error(`S3 fetch failed: ${response.status}`);
          return await response.json();
        } else if (source.type === 'local' && source.loader) {
          return await source.loader();
        }
      } catch (error) {
        continue;
      }
    }
    throw new Error('모든 번역 소스 로딩 실패');
  }

  static getLocalMockData(languageCode: string) {
    return new Promise((resolve) => {
      const mockData = languageCode === 'ko' ? i18nResourceKoMock : i18nResourceEnMock;
      console.log('local');
      setTimeout(() => resolve(mockData), 100);
    });
  }
}
