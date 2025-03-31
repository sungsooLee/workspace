import { getDefaultLang } from '@learnway/config';

import TermsService from '../api/terms';
import type { TermsType, Terms, TermsVersion } from '../../../types';

export const queryKeys = {
  all: ['terms'] as const,
  versions: (termsTypeCode: TermsType, locale: string) =>
    [...queryKeys.all, termsTypeCode, locale] as const,
  terms: (termsTypeCode: TermsType, locale: string, termsId?: number) =>
    [...queryKeys.all, termsTypeCode, locale, termsId] as const,
};

export const queryOptions = {
  versions: (termsTypeCode: TermsType, locale = getDefaultLang()) => ({
    queryKey: queryKeys.versions(termsTypeCode, locale),
    queryFn: (): Promise<TermsVersion[]> => TermsService.fetchTermsVersions(termsTypeCode, locale),
  }),
  terms: (termsTypeCode: TermsType, termsId?: number, locale = getDefaultLang()) => ({
    queryKey: queryKeys.terms(termsTypeCode, locale, termsId),
    queryFn: (): Promise<Terms> => {
      if (!termsId) {
        return TermsService.fetchTermsLatest(termsTypeCode, locale);
      } else {
        return TermsService.fetchTerms(termsId, termsTypeCode, locale);
      }
    },
  }),
};
