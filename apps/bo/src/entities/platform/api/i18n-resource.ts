import { isDev, isLocal } from '@learnway/config';

import i18nResourceEnMock from '../../mock/i18n-resource-en.json';
import i18nResourceKoMock from '../../mock/i18n-resource-ko.json';

export default class I18nResourceService {
  static isValidObject(value: any): value is Record<string, any> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
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
    let merged = {};

    if (localResult.status === 'fulfilled' && this.isValidObject(localResult.value)) {
      merged = { ...localResult.value };
    }

    if (s3Result.status === 'fulfilled' && this.isValidObject(s3Result.value)) {
      merged = { ...merged, ...s3Result.value };
    }

    return merged;
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

  static async fetchFromS3(languageCode: string, timeoutMs = 3000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_AXIOS_S3_URL}/public/i18n/${languageCode}.json`,
        {
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error: `);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      throw new Error(`${error}`);
    }
  }

  static getLocalMockData(languageCode: string) {
    return new Promise((resolve) => {
      const mockData = languageCode === 'ko' ? i18nResourceKoMock : i18nResourceEnMock;
      setTimeout(() => resolve(mockData), 100);
    });
  }
}
