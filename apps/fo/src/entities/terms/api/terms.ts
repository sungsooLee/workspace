import { PMSApiPrefix } from '@learnway/config';
import { httpService } from '@learnway/shared';

import type { Terms, TermsType, TermsVersion } from '../model/terms.types';

export default class TermsService {
  static fetchTermsVersions(termsTypeCode: TermsType, locale: string): Promise<TermsVersion[]> {
    return httpService.get<any[]>(`${PMSApiPrefix()}/terms/versions`, { termsTypeCode, locale });
    //return new Promise((resolve) => setTimeout(() => resolve(termsVersionsMock as TermsVersion[])));
  }
  static fetchTerms(termsId: number, termsTypeCode: TermsType, locale: string): Promise<Terms> {
    return httpService.get<any>(`${PMSApiPrefix()}/terms/${termsId}`, { termsTypeCode, locale });
    //return new Promise((resolve) => setTimeout(() => resolve(termsMock as Terms)));
  }
  static fetchTermsLatest(termsTypeCode: TermsType, locale: string): Promise<Terms> {
    return httpService.get<any>(`${PMSApiPrefix()}/terms/latest`, { termsTypeCode, locale });
    //return new Promise((resolve) => setTimeout(() => resolve(termsLatestMock as Terms)));
  }
}
