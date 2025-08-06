import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';

import type { Terms, TermsType, TermsTypeCode, TermsVersion } from '../model/terms.types';

export const termsApi = {
  fetchTermsVersions: (
    termsTypeCode: TermsTypeCode,
    tenantId: number,
    locale: string,
  ): Promise<TermsVersion[]> => {
    return httpService.get<any[]>(`${PMSApiPrefix()}/terms/versions`, {
      tenantId,
      termsTypeCode,
      locale: locale.toUpperCase(),
    });
  },
  fetchTerms: (termsId: number, termsTypeCode: TermsTypeCode, locale: string): Promise<Terms> => {
    return httpService.get<any>(`${PMSApiPrefix()}/terms/${termsId}`, {
      termsTypeCode,
      locale: locale.toUpperCase(),
    });
    //return new Promise((resolve) => setTimeout(() => resolve(termsMock as Terms)));
  },
  fetchTermsLatest: (termsTypeCode: TermsTypeCode, locale: string): Promise<Terms> => {
    return httpService.get<any>(`${PMSApiPrefix()}/terms/latest`, { termsTypeCode, locale });
    //return new Promise((resolve) => setTimeout(() => resolve(termsLatestMock as Terms)));
  },
};
