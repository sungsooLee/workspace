import { useQuery } from '@tanstack/react-query';

import { getDefaultLang } from '@learnway/config';

import { Terms, TermsTypeCode, TermsVersion } from '@entities/terms';
import { termsApi } from '../api/terms';
import { getQuerySkipToken } from '@learnway/shared';

export const queryKeys = {
  all: ['terms'] as const,
  versions: (termsTypeCode: TermsTypeCode, tenantId: number, locale: string) =>
    [...queryKeys.all, termsTypeCode, tenantId, locale] as const,
  terms: (termsTypeCode: TermsTypeCode, locale: string, termsId?: number) =>
    [...queryKeys.all, termsTypeCode, locale, termsId] as const,
};

export const queryOptions = {
  versions: (termsTypeCode: TermsTypeCode, tenantId?: number, locale?: string) =>
    tenantId && locale
      ? {
          queryKey: queryKeys.versions(termsTypeCode, tenantId, locale),
          queryFn: (): Promise<TermsVersion[]> =>
            termsApi.fetchTermsVersions(termsTypeCode, tenantId, locale),
        }
      : getQuerySkipToken<TermsVersion[]>(),
  terms: (termsTypeCode: TermsTypeCode, termsId?: number, locale?: string) =>
    termsId && locale
      ? {
          queryKey: queryKeys.terms(termsTypeCode, locale, termsId),
          queryFn: (): Promise<Terms> => {
            if (!termsId) {
              return termsApi.fetchTermsLatest(termsTypeCode, locale);
            } else {
              return termsApi.fetchTerms(termsId, termsTypeCode, locale);
            }
          },
        }
      : getQuerySkipToken<Terms>(),
};

export function useFetchTerms(termsType: TermsTypeCode, termsId?: number, locale?: string) {
  return useQuery(queryOptions.terms(termsType, termsId, locale));
}

export function useFetchTermsVersions(
  termsType: TermsTypeCode,
  tenantId?: number,
  locale?: string,
) {
  return useQuery(queryOptions.versions(termsType, tenantId, locale));
}

export const findTermsType = (key: string) => {
  if (key === 'privacy-policy') return TermsTypeCode.PRIVACY_POLICY;

  return TermsTypeCode.TERMS_OF_SERVICE;
};
