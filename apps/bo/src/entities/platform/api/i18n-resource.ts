import { httpService } from '@learnway/shared';
import { isDev, isLocal, PMSApiPrefix } from '@learnway/config';

import i18nResourceEnMock from '../../mock/i18n-resource-en.json';
import i18nResourceKoMock from '../../mock/i18n-resource-ko.json';

export default class I18nResourceService {
  static async fetchResource(languageCode: string) {
    if (isLocal() || isDev()) {
      return await this.fetchBothSources(languageCode);
    } else {
      return await this.fetchWithFallback(languageCode);
    }
  }

  static async fetchBothSources(languageCode: string) {
    const results = await Promise.allSettled([
      this.fetchFromS3(languageCode),
      this.getLocalMockData(languageCode),
    ]);

    const s3Result = results[0];
    const localResult = results[1];

    return this.mergeTranslationData(s3Result, localResult, languageCode);
  }

  static async fetchWithFallback(languageCode: string) {
    const sources = [
      { type: 's3', fetcher: () => this.fetchFromS3(languageCode) },
      { type: 'local', fetcher: () => this.getLocalMockData(languageCode) },
    ];

    for (const source of sources) {
      try {
        const result = await source.fetcher();
        return result;
      } catch (error) {
        continue;
      }
    }

    throw new Error('모든 번역 소스 로딩 실패');
  }

  static async fetchFromS3(languageCode: string) {
    const response = await fetch(
      `${import.meta.env.VITE_AXIOS_S3_URL}/public/i18n/${languageCode}.json`,
    );
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return await response.json();
  }

  static mergeTranslationData(s3Result: any, localResult: any, languageCode: string) {
    if (s3Result.status === 'fulfilled' && localResult.status === 'fulfilled') {
      const merged = {
        ...localResult.value,
        ...s3Result.value,
      };
      return merged;
    }

    throw new Error(`${languageCode} 언어의 모든 번역 소스 로딩 실패`);
  }

  static getLocalMockData(languageCode: string) {
    return new Promise((resolve) => {
      const mockData = languageCode === 'ko' ? i18nResourceKoMock : i18nResourceEnMock;
      setTimeout(() => resolve(mockData), 100);
    });
  }
}
